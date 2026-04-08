import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const PROMPT = "Minimal warm watercolor illustration, soft pastel tones with beige and muted green, no text, no letters, no words, clean composition, gentle and calming mood. A young person sitting peacefully by a window in a cozy room, warm sunlight streaming in, plants on the windowsill, soft cushions, a cup of tea nearby. The scene conveys comfort, safety, and hope. Suitable for a psychology counseling website landing page hero section.";

async function generateHeroImage() {
  const apiKey = process.env.NANOBANANA_API_KEY;
  if (!apiKey) {
    console.error('[generate-hero-image] ERROR: NANOBANANA_API_KEY not set in .env.local');
    process.exit(1);
  }

  console.log('[generate-hero-image] Calling Gemini API for image generation...');

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Generate an image: ${PROMPT}`
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
    const errorBody = await response.text();
    console.error(`[generate-hero-image] Gemini API error: ${response.status} ${response.statusText}`);
    console.error('[generate-hero-image] Response body:', errorBody);
    process.exit(1);
  }

  const result = await response.json();

  const parts = result.candidates?.[0]?.content?.parts;
  if (!parts) {
    console.error('[generate-hero-image] No parts in Gemini response');
    console.error('[generate-hero-image] Full response:', JSON.stringify(result, null, 2));
    process.exit(1);
  }

  const imagePart = parts.find((p: any) => p.inlineData?.mimeType?.startsWith('image/'));
  if (!imagePart) {
    console.error('[generate-hero-image] No image data in Gemini response');
    const textPart = parts.find((p: any) => p.text);
    if (textPart) {
      console.error('[generate-hero-image] Text response:', textPart.text);
    }
    console.error('[generate-hero-image] Parts:', JSON.stringify(parts, null, 2));
    process.exit(1);
  }

  console.log('[generate-hero-image] Image received, optimizing with sharp...');

  const rawBuffer = Buffer.from(imagePart.inlineData.data, 'base64');
  const sharp = (await import('sharp')).default;
  const optimizedBuffer = await sharp(rawBuffer)
    .resize(1200, null, { withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();

  console.log(`[generate-hero-image] Optimized: ${Math.round(rawBuffer.length / 1024)}KB → ${Math.round(optimizedBuffer.length / 1024)}KB`);

  const outputPath = path.resolve(__dirname, '../public/images/hero-young-adult.webp');
  fs.writeFileSync(outputPath, optimizedBuffer);

  console.log(`[generate-hero-image] Saved to: ${outputPath}`);
}

generateHeroImage().catch((err) => {
  console.error('[generate-hero-image] Unexpected error:', err);
  process.exit(1);
});
