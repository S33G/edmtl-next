/* Generate responsive derivatives without changing the source photographs. */
const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('sharp');

const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');
const outputDir = path.join(publicDir, 'images', 'optimized');
const dataDir = path.join(root, 'src', 'data');
const widths = [480, 800, 1200, 1600];

async function main() {
  const services = JSON.parse(await fs.readFile(path.join(dataDir, 'services.en.json'), 'utf8'));
  const gallery = await fs.readFile(path.join(dataDir, 'gallery.ts'), 'utf8');
  const sources = new Set([
    '/images/frontpagesplash.png',
    '/images/gutter-cleaning-after-1.jpg',
    '/images/edmtl-logo.png',
    '/images/edm-main-logo.png',
    '/images/edm-box-logo.png',
    ...services.flatMap((service) => [service.hero, ...service.images.map((image) => image.src)]),
    ...Array.from(gallery.matchAll(/src: '(\/images\/[^']+)'/g), (match) => match[1]),
  ]);

  await fs.mkdir(outputDir, { recursive: true });
  const manifest = {};
  let originalBytes = 0;
  let generatedBytes = 0;

  for (const source of [...sources].sort()) {
    const input = path.join(publicDir, source.replace(/^\//, ''));
    const metadata = await sharp(input).metadata();
    const oriented = metadata.orientation && metadata.orientation >= 5;
    const width = oriented ? metadata.height : metadata.width;
    const height = oriented ? metadata.width : metadata.height;
    if (!width || !height) throw new Error(`Cannot read image dimensions: ${source}`);
    originalBytes += (await fs.stat(input)).size;
    const targets = widths.filter((target) => target <= width);
    if (targets.length === 0) targets.push(width);
    const name = source.replace(/^\/images\//, '').replace(/\.[^.]+$/, '').replace(/[^a-z0-9-]+/gi, '-').toLowerCase();
    const variants = [];

    for (const target of targets) {
      const filename = `${name}-${target}.webp`;
      const info = await sharp(input).rotate().resize({ width: target, withoutEnlargement: true })
        .webp({ quality: 82, effort: 5 }).toFile(path.join(outputDir, filename));
      generatedBytes += info.size;
      variants.push({ src: `/images/optimized/${filename}`, width: info.width, height: info.height });
    }
    manifest[source] = { width, height, variants };
  }

  await fs.writeFile(path.join(dataDir, 'image-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
  // Keep installable-app icons inside the maskable safe area.
  for (const size of [192, 512]) {
    const inset = Math.round(size * 0.2);
    const mark = await sharp(path.join(publicDir, 'images/edm-box-logo.png'))
      .resize(size - inset * 2, size - inset * 2, { fit: 'inside' }).png().toBuffer();
    await sharp({ create: { width: size, height: size, channels: 4, background: '#F9F6F0' } })
      .composite([{ input: mark, gravity: 'centre' }]).png()
      .toFile(path.join(publicDir, `images/app-icon-${size}.png`));
  }
  console.log(`Optimized ${sources.size} originals (${(originalBytes / 1024 / 1024).toFixed(2)} MB) into responsive WebP variants (${(generatedBytes / 1024 / 1024).toFixed(2)} MB total).`);
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
