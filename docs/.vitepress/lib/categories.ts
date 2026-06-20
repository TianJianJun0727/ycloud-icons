import fs from 'fs';
import path from 'path';
import { Category, IconEntity } from '../theme/types';

const directory = path.join(process.cwd(), '../categories');
type CategoryMetadata = Omit<Category, 'iconCount' | 'icons'>;

export function getAllCategoryFiles(): CategoryMetadata[] {
  const fileNames = fs.readdirSync(directory).filter((file) => path.extname(file) === '.json');

  return fileNames.map((fileName) => {
    const name = path.basename(fileName, '.json');
    const fileContent = fs.readFileSync(path.join(directory, fileName), 'utf8');

    const parsedFileContent = JSON.parse(fileContent);

    return {
      name,
      title: parsedFileContent.title,
      englishTitle: parsedFileContent.i18n.en.title,
    };
  });
}

export function mapCategoryIconCount(
  categories: CategoryMetadata[],
  icons: { categories: IconEntity['categories'] }[],
): Category[] {
  return categories.map((category) => ({
    ...category,
    iconCount: icons.reduce(
      (acc, curr) => (curr.categories.includes(category.name) ? ++acc : acc),
      0,
    ),
  }));
}
