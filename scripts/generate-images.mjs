import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

async function generateFavicon() {
  const logoPath = join(ROOT, 'public/images/logo-symbol-trans.png');

  const bg = { r: 255, g: 255, b: 255, alpha: 1 }; // White background for dark mode visibility

  // Generate 32x32 PNG for favicon
  const png32 = await sharp(logoPath)
    .flatten({ background: bg })
    .resize(32, 32, { fit: 'contain', background: bg })
    .png()
    .toBuffer();

  // Generate 48x48 PNG
  const png48 = await sharp(logoPath)
    .flatten({ background: bg })
    .resize(48, 48, { fit: 'contain', background: bg })
    .png()
    .toBuffer();

  // Generate 16x16 PNG
  const png16 = await sharp(logoPath)
    .flatten({ background: bg })
    .resize(16, 16, { fit: 'contain', background: bg })
    .png()
    .toBuffer();

  // Build ICO file (simple ICO format with PNG entries)
  const ico = buildIco([
    { size: 16, data: png16 },
    { size: 32, data: png32 },
    { size: 48, data: png48 },
  ]);

  writeFileSync(join(ROOT, 'app/favicon.ico'), ico);
  console.log('✓ app/favicon.ico generated');

  // Also update public/favicon.ico
  writeFileSync(join(ROOT, 'public/favicon.ico'), ico);
  console.log('✓ public/favicon.ico generated');

  // Generate 192x192 icon.png
  await sharp(logoPath)
    .flatten({ background: bg })
    .resize(192, 192, { fit: 'contain', background: bg })
    .png()
    .toFile(join(ROOT, 'public/icon.png'));
  console.log('✓ public/icon.png generated (192x192)');

  // Generate apple-touch-icon (180x180, with white background for Apple)
  await sharp(logoPath)
    .resize(160, 160, { fit: 'contain', background: { r: 249, g: 249, b: 246, alpha: 1 } })
    .extend({ top: 10, bottom: 10, left: 10, right: 10, background: { r: 249, g: 249, b: 246, alpha: 1 } })
    .png()
    .toFile(join(ROOT, 'public/apple-touch-icon.png'));
  console.log('✓ public/apple-touch-icon.png generated (180x180)');
}

function buildIco(entries) {
  // ICO header: 6 bytes
  const headerSize = 6;
  const dirEntrySize = 16;
  const dataOffset = headerSize + dirEntrySize * entries.length;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);      // Reserved
  header.writeUInt16LE(1, 2);      // Type: 1 = ICO
  header.writeUInt16LE(entries.length, 4); // Number of images

  let currentOffset = dataOffset;
  const dirEntries = [];

  for (const entry of entries) {
    const dir = Buffer.alloc(dirEntrySize);
    dir.writeUInt8(entry.size < 256 ? entry.size : 0, 0);  // Width
    dir.writeUInt8(entry.size < 256 ? entry.size : 0, 1);  // Height
    dir.writeUInt8(0, 2);           // Color palette
    dir.writeUInt8(0, 3);           // Reserved
    dir.writeUInt16LE(1, 4);        // Color planes
    dir.writeUInt16LE(32, 6);       // Bits per pixel
    dir.writeUInt32LE(entry.data.length, 8);  // Size of image data
    dir.writeUInt32LE(currentOffset, 12);     // Offset to image data
    dirEntries.push(dir);
    currentOffset += entry.data.length;
  }

  return Buffer.concat([header, ...dirEntries, ...entries.map(e => e.data)]);
}

async function generateOgImage() {
  const logoSetPath = join(ROOT, 'public/images/logo-set.webp');
  const width = 1200;
  const height = 630;

  // Use the full logo-set (symbol + text) and resize to fit nicely
  const logoSet = await sharp(logoSetPath)
    .resize(480, 400, { fit: 'inside', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const logoMeta = await sharp(logoSet).metadata();
  const logoW = logoMeta.width;
  const logoH = logoMeta.height;

  // Create the OG image with brand colors
  const svgBase = `
  <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f9f9f6"/>
        <stop offset="50%" stop-color="#f5f6f2"/>
        <stop offset="100%" stop-color="#f0f2ed"/>
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="45%" r="50%">
        <stop offset="0%" stop-color="#b1f0ce" stop-opacity="0.15"/>
        <stop offset="100%" stop-color="#b1f0ce" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <!-- Background -->
    <rect width="${width}" height="${height}" fill="url(#bg)"/>
    <!-- Soft green glow behind logo -->
    <ellipse cx="600" cy="280" rx="350" ry="250" fill="url(#glow)"/>
    <!-- Top accent bar -->
    <rect x="0" y="0" width="${width}" height="5" fill="#2d6a4f"/>
    <!-- Bottom accent bar -->
    <rect x="0" y="${height - 3}" width="${width}" height="3" fill="#2d6a4f" opacity="0.4"/>
    <!-- Subtle side decorations -->
    <rect x="60" y="180" width="3" height="270" rx="1.5" fill="#2d6a4f" opacity="0.08"/>
    <rect x="1137" y="180" width="3" height="270" rx="1.5" fill="#2d6a4f" opacity="0.08"/>
  </svg>`;

  const base = await sharp(Buffer.from(svgBase))
    .png()
    .toBuffer();

  await sharp(base)
    .composite([
      {
        input: logoSet,
        top: Math.round((height - logoH) / 2),
        left: Math.round((width - logoW) / 2),
      },
    ])
    .png({ quality: 90 })
    .toFile(join(ROOT, 'public/og-default.png'));

  console.log('✓ public/og-default.png generated (1200x630)');
}

async function main() {
  console.log('Generating images from logo-symbol-trans.png...\n');
  await generateFavicon();
  await generateOgImage();
  console.log('\nDone!');
}

main().catch(console.error);
