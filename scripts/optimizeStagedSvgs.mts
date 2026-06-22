/**
 * 优化指定的暂存或增量 SVG 文件。
 * 供 PR 自动修复流程只处理本次变更的 SVG，避免全量清洗。
 */
import fs from 'fs';
import processSvg from './render/processSvg.mts';

const svgFiles = process.argv.slice(2);

await Promise.all(
  svgFiles.map(async (svgFile) => {
    console.log('Optimizing staged SVG file:', svgFile);
    const content = fs.readFileSync(svgFile, 'utf-8');
    const svg = await processSvg(content, svgFile);
    fs.writeFileSync(svgFile, svg, 'utf-8');
  }),
);
