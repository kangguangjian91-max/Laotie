/**
 * Batch image optimization using sharp
 * Converts JPG/PNG to WebP, re-compresses large WebP, strips EXIF
 */
import sharp from 'sharp';
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, extname } from 'path';

const IMAGE_DIRS = [
  'public/images',
  'public/images/blog',
  'public/images/factory',
  'public/images/projects',
  'public/images/certificates',
  'public/images/avatars',
  'public/images/manufacturing-process',
  'public/images/exhibition',
];

const WEBP_Q = 75;
const JPEG_Q = 80;
const MIN_SIZE = 50 * 1024;
const MAX_WIDTH = 1920;
const TMP_SUFFIX = '.opt_tmp';

async function processFile(filePath) {
  const stats = statSync(filePath);
  if (stats.size < MIN_SIZE) return null;

  const ext = extname(filePath).toLowerCase();
  if (!['.webp', '.jpg', '.jpeg', '.png'].includes(ext)) return null;

  const isWebp = ext === '.webp';
  const oldSize = stats.size;
  const tmpPath = filePath + TMP_SUFFIX;

  try {
    const metadata = await sharp(filePath).metadata();
    let pipeline = sharp(filePath);

    if ((metadata.width || 0) > MAX_WIDTH) {
      pipeline = pipeline.resize(MAX_WIDTH, undefined, { fit: 'inside', withoutEnlargement: true });
    }

    if (isWebp) {
      pipeline = pipeline.webp({ quality: WEBP_Q, effort: 4 });
    } else {
      pipeline = pipeline.webp({ quality: JPEG_Q, effort: 4 });
    }

    await pipeline.toFile(tmpPath);
    const newSize = statSync(tmpPath).size;

    if (newSize >= oldSize && isWebp) {
      // WebP didn't get smaller, skip
      writeFileSync(tmpPath, '');
      return null;
    }

    writeFileSync(filePath, readFileSync(tmpPath));
    try { writeFileSync(tmpPath, ''); } catch {}

    return { file: filePath, oldSize, newSize, saved: oldSize - newSize };
  } catch (err) {
    console.error('  Error:', filePath, err.message);
    return null;
  }
}

async function main() {
  let totalOld = 0, totalNew = 0, count = 0;

  for (const dir of IMAGE_DIRS) {
    const fullPath = join(process.cwd(), dir);
    if (!existsSync(fullPath)) continue;

    const files = readdirSync(fullPath).filter(f =>
      /\.(webp|jpg|jpeg|png)$/i.test(f) && !f.endsWith(TMP_SUFFIX)
    );
    if (!files.length) continue;

    console.log(`\n${dir} (${files.length} files)`);
    for (const file of files) {
      const result = await processFile(join(fullPath, file));
      if (result) {
        const pct = ((result.saved / result.oldSize) * 100).toFixed(0);
        console.log(`  ${(result.oldSize/1024).toFixed(0)}KB -> ${(result.newSize/1024).toFixed(0)}KB (-${pct}%)  ${file}`);
        totalOld += result.oldSize;
        totalNew += result.newSize;
        count++;
      }
    }
  }

  const savedKB = ((totalOld - totalNew) / 1024).toFixed(0);
  console.log(`\nDone: ${count} images optimized, saved ${savedKB} KB total`);
}

main().catch(console.error);
