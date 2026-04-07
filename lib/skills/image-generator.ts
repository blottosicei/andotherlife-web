import { createClient } from '@/lib/supabase/server';

const STYLE_PROMPT = `Minimal warm watercolor illustration, soft pastel tones with beige and muted green, no text, no letters, no words, clean composition, gentle and calming mood, suitable for a psychology counseling blog`;

/**
 * Generate a blog thumbnail image using Gemini (Nanobanana2) API
 * and upload to Supabase Storage.
 *
 * @returns Public URL of the uploaded image, or null on failure
 */
export async function generateBlogImage(
  slug: string,
  topicKeywords: string[]
): Promise<string | null> {
  const apiKey = process.env.NANOBANANA_API_KEY;
  if (!apiKey) {
    console.error('[image-generator] NANOBANANA_API_KEY not set');
    return null;
  }

  const topicPrompt = topicKeywords.join(', ');
  const fullPrompt = `${STYLE_PROMPT}. Topic: ${topicPrompt}`;

  try {
    // Call Gemini API for image generation
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Generate an image: ${fullPrompt}`
            }]
          }],
          generationConfig: {
            responseModalities: ['IMAGE', 'TEXT'],
            responseMimeType: 'text/plain',
          },
        }),
      }
    );

    if (!response.ok) {
      console.error(`[image-generator] Gemini API error: ${response.status} ${response.statusText}`);
      return null;
    }

    const result = await response.json();

    // Extract image data from response
    const parts = result.candidates?.[0]?.content?.parts;
    if (!parts) {
      console.error('[image-generator] No parts in Gemini response');
      return null;
    }

    const imagePart = parts.find((p: any) => p.inlineData?.mimeType?.startsWith('image/'));
    if (!imagePart) {
      console.error('[image-generator] No image data in Gemini response');
      return null;
    }

    // Convert base64 to buffer + optimize with sharp
    const rawBuffer = Buffer.from(imagePart.inlineData.data, 'base64');
    const sharp = (await import('sharp')).default;
    const optimizedBuffer = await sharp(rawBuffer)
      .resize(1200, null, { withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();

    console.log(`[image-generator] Optimized: ${Math.round(rawBuffer.length / 1024)}KB → ${Math.round(optimizedBuffer.length / 1024)}KB`);

    const fileName = `thumbnails/${slug}.webp`;

    // Upload to Supabase Storage
    const supabase = await createClient();
    const { error: uploadError } = await supabase.storage
      .from('blog-images')
      .upload(fileName, optimizedBuffer, {
        contentType: 'image/webp',
        upsert: true,
      });

    if (uploadError) {
      console.error('[image-generator] Upload error:', uploadError.message);
      return null;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('blog-images')
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  } catch (error) {
    console.error('[image-generator] Error:', error);
    return null;
  }
}
