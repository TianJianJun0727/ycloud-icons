import fs from 'node:fs/promises';
import path from 'node:path';

const files = process.argv.slice(2).filter((file) => file.endsWith('.json'));

if (files.length === 0) {
  console.log('No changed icon metadata files to validate.');
  process.exit(0);
}

const categoriesDir = path.resolve('categories');
const categoryFiles = (await fs.readdir(categoriesDir)).filter((file) => file.endsWith('.json'));
const knownCategories = new Set(categoryFiles.map((file) => path.basename(file, '.json')));

let hasError = false;

function report(file: string, message: string) {
  console.error(`${file}: ${message}`);
  hasError = true;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function sameArray(left: string[], right: string[]) {
  return left.length === right.length && left.every((item, index) => item === right[index]);
}

for (const file of files) {
  if (!file.startsWith('icons/') && !file.startsWith('categories/')) {
    continue;
  }

  let metadata: Record<string, unknown>;
  try {
    metadata = JSON.parse(await fs.readFile(file, 'utf-8')) as Record<string, unknown>;
  } catch (error) {
    report(file, `cannot parse JSON: ${error instanceof Error ? error.message : String(error)}`);
    continue;
  }

  if (!file.startsWith('icons/')) {
    continue;
  }

  const categories = metadata.categories;
  const englishCategories = (metadata.i18n as Record<string, any> | undefined)?.en?.categories;

  if (!isStringArray(categories)) {
    report(file, '`categories` must be an array of category slugs.');
    continue;
  }

  if (!isStringArray(englishCategories)) {
    report(file, '`i18n.en.categories` must be an array of the same category slugs.');
    continue;
  }

  for (const category of categories) {
    if (!knownCategories.has(category)) {
      report(file, `category '${category}' does not exist in categories/*.json.`);
    }
  }

  if (!sameArray(categories, englishCategories)) {
    report(
      file,
      '`i18n.en.categories` must be identical to `categories`; both fields store stable category slugs, not translated display names.',
    );
  }
}

if (hasError) {
  process.exit(1);
}

console.log('Changed icon metadata files are valid.');
