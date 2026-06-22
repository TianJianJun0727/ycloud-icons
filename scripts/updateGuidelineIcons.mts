/**
 * 更新文档图标设计指南使用的 SVG 示例。
 * 批量替换 docs/images 下 SVG 的展示属性，保证指南示例风格统一。
 */
import path from 'path';
import { readdirSync, readFileSync, writeFileSync } from 'fs';

for (const file of readdirSync(path.join(import.meta.dirname, '../docs/images'))) {
  if (!file.endsWith('.svg')) continue;
  const fileName = path.join(import.meta.dirname, '../docs/images', file);
  const oldFileContent = readFileSync(fileName, 'utf8');
  const newFileContent = oldFileContent
    .split('</g>')
    .map((val) =>
      val.replace(
        /(<g id="embed-ycloud-([^"]*).*>)(.|\n)*/gm,
        (_, groupOpeningTag, iconName) =>
          [
            groupOpeningTag,
            ...readFileSync(path.join(import.meta.dirname, `../icons/${iconName}.svg`), 'utf8')
              .replace(/(<svg)([^>]|\n)*>|<\/svg>/g, '')
              .split('\n'),
          ]
            .map((val) => val.trimEnd())
            .filter(Boolean)
            .join('\n') + '\n',
      ),
    )
    .join('</g>');
  if (oldFileContent !== newFileContent) {
    console.log(`Updating ${fileName}`);
    writeFileSync(fileName, newFileContent);
  }
}
