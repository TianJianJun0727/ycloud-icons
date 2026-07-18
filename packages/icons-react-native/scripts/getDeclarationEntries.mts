import fs from 'node:fs/promises';
import path from 'node:path';

export default async function getDeclarationEntries(directory: string) {
  const entries = await fs.readdir(directory, { withFileTypes: true });

  return Object.fromEntries(
    entries
      .filter(
        (entry) =>
          entry.isFile() &&
          entry.name !== 'index.ts' &&
          (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx')),
      )
      .map((entry) => [entry.name.replace(/\.tsx?$/, ''), path.join(directory, entry.name)]),
  );
}
