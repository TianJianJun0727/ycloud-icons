import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

type IconMetadata = {
  tags?: string[];
  i18n?: {
    en?: {
      tags?: string[];
    };
  };
  [key: string]: unknown;
};

type TagTranslationMap = Record<string, string>;

export function buildChineseTagsFromEnglish(
  englishTags: string[],
  translations: TagTranslationMap,
) {
  return englishTags.map((tag) => {
    const translated = translations[tag];
    if (!translated) {
      throw new Error(`Missing Chinese tag translation: ${tag}`);
    }
    return translated;
  });
}

async function fixAllIconTags() {
  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  const repoRoot = path.resolve(scriptDir, '..');
  const iconsDir = path.join(repoRoot, 'icons');
  const translations = JSON.parse(
    await fs.readFile(path.join(scriptDir, 'data/tagTranslations.zh-CN.json'), 'utf-8'),
  ) as TagTranslationMap;
  const files = (await fs.readdir(iconsDir)).filter((file) => file.endsWith('.json')).sort();

  await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(iconsDir, file);
      const metadata = JSON.parse(await fs.readFile(filePath, 'utf-8')) as IconMetadata;
      const englishTags = metadata.i18n?.en?.tags;

      if (!Array.isArray(englishTags)) {
        throw new Error(`${file} is missing i18n.en.tags`);
      }

      metadata.tags = buildChineseTagsFromEnglish(englishTags, translations);
      await fs.writeFile(filePath, `${JSON.stringify(metadata, null, 2)}\n`, 'utf-8');
    }),
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await fixAllIconTags();
}
