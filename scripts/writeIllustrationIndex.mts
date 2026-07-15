import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ILLUSTRATION_DIR = 'illustration-icons';
const ILLUSTRATION_INDEX_FILE = path.join(ILLUSTRATION_DIR, 'index.json');
const DEFAULT_CATEGORY = 'other';
const CATEGORY_TITLE_BY_NAME: Record<string, { title: string; englishTitle: string }> = {
  integration: { title: '集成', englishTitle: 'Integration' },
  logo: { title: '标识', englishTitle: 'Logo' },
  other: { title: '其他', englishTitle: 'Other' },
  template: { title: '模板', englishTitle: 'Template' },
  version: { title: '版本', englishTitle: 'Version' },
};

const toPosixPath = (value: string) => value.split(path.sep).join('/');

const toPascalCase = (value: string) =>
  value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join('');

const getComponentName = (name: string) => {
  const pascal = toPascalCase(name);
  if (/^[a-zA-Z_$]/.test(pascal)) {
    return pascal;
  }
  return `Illustration${pascal}`;
};

const toTitle = (value: string) =>
  value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(' ');

const getCategoryTitle = (category: string) =>
  CATEGORY_TITLE_BY_NAME[category] ?? {
    title: toTitle(category),
    englishTitle: toTitle(category),
  };

async function readIllustrationSvgFiles(dir: string, category?: string) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (dir !== ILLUSTRATION_DIR || entry.name === 'metadata') {
          return [];
        }
        return readIllustrationSvgFiles(fullPath, entry.name);
      }
      if (!entry.isFile() || !entry.name.endsWith('.svg')) {
        return [];
      }

      const name = path.basename(entry.name, '.svg');
      const normalizedCategory = category ?? DEFAULT_CATEGORY;
      return [
        {
          name,
          path: toPosixPath(path.join(dir, entry.name)),
          componentName: getComponentName(name),
          category: normalizedCategory,
        },
      ];
    }),
  );

  return files.flat();
}

export async function buildIllustrationIndex() {
  try {
    const illustrations = (await readIllustrationSvgFiles(ILLUSTRATION_DIR)).sort((left, right) =>
      left.name.localeCompare(right.name),
    );
    const names = new Set<string>();
    for (const illustration of illustrations) {
      if (names.has(illustration.name)) {
        throw new Error(`Duplicate illustration name "${illustration.name}".`);
      }
      names.add(illustration.name);
    }
    const categoryNames = [...new Set(illustrations.map((illustration) => illustration.category))];
    const categories = categoryNames
      .sort((left, right) => {
        if (left === DEFAULT_CATEGORY) return 1;
        if (right === DEFAULT_CATEGORY) return -1;
        return left.localeCompare(right);
      })
      .map((name) => {
        const title = getCategoryTitle(name);
        return {
          name,
          title: title.title,
          i18n: {
            en: {
              title: title.englishTitle,
            },
          },
        };
      });

    return { categories, illustrations };
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
      return { categories: [], illustrations: [] };
    }
    throw error;
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const index = await buildIllustrationIndex();
  await fs.mkdir(ILLUSTRATION_DIR, { recursive: true });
  await fs.writeFile(ILLUSTRATION_INDEX_FILE, `${JSON.stringify(index, null, 2)}\n`, 'utf-8');
}
