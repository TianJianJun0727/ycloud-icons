/**
 * 优化指定的暂存或增量 SVG 文件。
 *
 * 输入：命令行传入的 SVG 文件路径列表。
 * 行为：
 * - 对每个文件读取原始 SVG。
 * - 调用 `render/processSvg.mts` 做 SVGO 清洗、默认属性归一化和 SVG 专用格式化。
 * - 将处理后的 SVG 覆写回原文件。
 *
 * 适用场景：PR 自动修复流程只处理本次变更的 SVG，避免全量清洗。
 * 调用位置：`lint-staged.config.mjs` 和 `.github/workflows/fix-icon-source.yml`。
 * 调用时机：提交或 PR 中存在变更 SVG 时，只清洗这些变更文件。
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
