import path from 'path';
import fs from 'fs/promises';
import { readSvgDirectory } from '@ycloud-web/helpers';
import { type IconMetadata } from '../types.ts';

async function getIconMetaData(iconDirectory: string): Promise<Record<string, IconMetadata>> {
  const iconJsons = await readSvgDirectory(iconDirectory, '.json');
  const aliasesEntries = await Promise.all(
    iconJsons.map(async (jsonFile: string) => {
      const filePath = path.join(iconDirectory, jsonFile);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const metadata = JSON.parse(fileContent) as IconMetadata;
      return [path.basename(jsonFile, '.json'), metadata];
    }),
  );

  return Object.fromEntries(aliasesEntries);
}

export default getIconMetaData;
