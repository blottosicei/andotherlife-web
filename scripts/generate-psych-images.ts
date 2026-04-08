import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const IMAGES = [
  {
    name: 'psych-mmpi',
    outputFile: 'public/images/psych-mmpi.webp',
    prompt: "Minimal warm watercolor illustration, soft pastel tones with beige and muted green, no text, no letters, no words, clean composition, gentle and calming mood. Abstract representation of emotional patterns and psychology - a person looking at a mirror showing different colored layers of emotion, warm light, introspective mood. Suitable for a psychology counseling website.",
  },
  {
    name: 'psych-tci',
    outputFile: 'public/images/psych-tci.webp',
    prompt: "Minimal warm watercolor illustration, soft pastel tones with beige and muted green, no text, no letters, no words, clean composition, gentle and calming mood. Abstract representation of personality and temperament - puzzle pieces of different warm colors fitting together to form a person's silhouette, harmonious composition. Suitable for a psychology counseling website.",
  },
];

async function generateImage(name: string, prompt: string, outputFile: string, apiKey: string): Promise<void> {
  console.log(`[generate-psych-images] Generating ${name}...`);

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Generate an image: ${prompt}`
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
    console.error(`[generate-psych-images] Gemini API error for ${name}: ${response.status} ${response.statusText}`);
    console.error('[generate-psych-images] Response body:', errorBody);
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  const result = await response.json();

  const parts = result.candidates?.[0]?.content?.parts;
  if (!parts) {
    console.error(`[generate-psych-images] No parts in Gemini response for ${name}`);
    console.error('[generate-psych-images] Full response:', JSON.stringify(result, null, 2));
    throw new Error('No parts in response');
  }

  const imagePart = parts.find((p: any) => p.inlineData?.mimeType?.startsWith('image/'));
  if (!imagePart) {
    console.error(`[generate-psych-images] No image data in Gemini response for ${name}`);
    const textPart = parts.find((p: any) => p.text);
    if (textPart) {
      console.error('[generate-psych-images] Text response:', textPart.text);
    }
    console.error('[generate-psych-images] Parts:', JSON.stringify(parts, null, 2));
    throw new Error('No image data in response');
  }

  console.log(`[generate-psych-images] Image received for ${name}, optimizing with sharp...`);

  const rawBuffer = Buffer.from(imagePart.inlineData.data, 'base64');
  const sharp = (await import('sharp')).default;
  const optimizedBuffer = await sharp(rawBuffer)
    .resize(800, null, { withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();

  console.log(`[generate-psych-images] Optimized ${name}: ${Math.round(rawBuffer.length / 1024)}KB → ${Math.round(optimizedBuffer.length / 1024)}KB`);

  const outputPath = path.resolve(__dirname, '..', outputFile);
  fs.writeFileSync(outputPath, optimizedBuffer);

  console.log(`[generate-psych-images] Saved ${name} to: ${outputPath}`);
}

async function main() {
  const apiKey = process.env.NANOBANANA_API_KEY;
  if (!apiKey) {
    console.error('[generate-psych-images] ERROR: NANOBANANA_API_KEY not set in .env.local');
    process.exit(1);
  }

  for (const image of IMAGES) {
    await generateImage(image.name, image.prompt, image.outputFile, apiKey);
  }

  console.log('[generate-psych-images] All images generated successfully.');
}

main().catch((err) => {
  console.error('[generate-psych-images] Unexpected error:', err);
  process.exit(1);
});
