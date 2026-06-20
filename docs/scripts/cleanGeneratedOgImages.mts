import fs from 'fs/promises';
import path from 'path';

const currentDir = process.cwd();
const ogDirectory = path.resolve(currentDir, 'public/og');
const keepFiles = new Set(['general.png']);

try {
  const entries = await fs.readdir(ogDirectory, { withFileTypes: true });
  const generatedFiles = entries.filter((entry) => entry.isFile() && !keepFiles.has(entry.name));

  await Promise.all(generatedFiles.map((entry) => fs.rm(path.join(ogDirectory, entry.name))));

  if (generatedFiles.length) {
    console.log(`Removed ${generatedFiles.length} generated OG images.`);
  }
} catch (error) {
  if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
    throw error;
  }
}
