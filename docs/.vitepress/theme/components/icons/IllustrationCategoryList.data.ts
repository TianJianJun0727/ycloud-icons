import fs from 'node:fs';
import path from 'node:path';

const repoRoot = path.resolve(process.cwd(), '..');
const illustrationIconsDir = path.resolve(repoRoot, 'illustration-icons');
const indexPath = path.resolve(illustrationIconsDir, 'index.json');

type IllustrationIndex = {
  categories: Array<{
    name: string;
    title: string;
    i18n: {
      en: {
        title: string;
      };
    };
  }>;
  illustrations: Array<{
    category: string;
  }>;
};

export default {
  async load() {
    const index = JSON.parse(fs.readFileSync(indexPath, 'utf8')) as IllustrationIndex;
    const categories = index.categories.map((category) => ({
      name: category.name,
      title: category.title,
      englishTitle: category.i18n.en.title,
      iconCount: index.illustrations.filter(
        (illustration) => illustration.category === category.name,
      ).length,
    }));

    return {
      categories,
    };
  },
};
