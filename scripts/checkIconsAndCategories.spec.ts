import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { checkIconsAndCategories } from './checkIconsAndCategories.mts';

let tempDir: string;
let iconsDir: string;
let categoriesDir: string;

async function writeJson(file: string, value: unknown) {
  await fs.writeFile(file, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

async function writeCategory(name: string) {
  await writeJson(path.join(categoriesDir, `${name}.json`), {
    $schema: '../category.schema.json',
    name,
    i18n: {
      en: {
        name,
      },
    },
  });
}

async function writeIcon(
  name: string,
  metadata: Partial<{
    aliases: Array<{ name: string }>;
    categories: string[];
  }> = {},
) {
  await fs.writeFile(path.join(iconsDir, `${name}.svg`), '<svg></svg>\n', 'utf8');
  await writeJson(path.join(iconsDir, `${name}.json`), {
    $schema: '../icon.schema.json',
    name,
    tags: [name],
    categories: metadata.categories ?? ['test-category'],
    'use-cases': [`${name} use case`],
    i18n: {
      en: {
        name,
        tags: [name],
        'use-cases': [`${name} use case`],
      },
    },
    ...(metadata.aliases ? { aliases: metadata.aliases } : {}),
  });
}

beforeEach(async () => {
  tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'ycloud-icons-check-'));
  iconsDir = path.join(tempDir, 'icons');
  categoriesDir = path.join(tempDir, 'categories');
  await fs.mkdir(iconsDir, { recursive: true });
  await fs.mkdir(categoriesDir, { recursive: true });
  await writeCategory('test-category');
});

afterEach(async () => {
  await fs.rm(tempDir, { recursive: true, force: true });
});

describe('checkIconsAndCategories', () => {
  it('passes when svg, metadata, categories, and aliases are unique', async () => {
    await writeIcon('camera', { aliases: [{ name: 'snapshot' }] });
    await writeIcon('search');

    const result = await checkIconsAndCategories(iconsDir, categoriesDir);

    expect(result.errors).toEqual([]);
  });

  it('reports duplicate canonical names and aliases across all metadata', async () => {
    await writeIcon('camera', { aliases: [{ name: 'snapshot' }] });
    await writeIcon('snapshot');

    const result = await checkIconsAndCategories(iconsDir, categoriesDir);

    expect(result.errors).toContain(
      'Duplicate icon name or alias after case normalization: snapshot. Owners: camera, snapshot.',
    );
  });
});
