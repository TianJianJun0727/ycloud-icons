/**
 * 校验源 SVG 是否符合仓库规范。
 * 检查根节点属性、禁止的 style/class 和重复属性，配合 Prettier 仅处理 SVG 格式化。
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { parseSync, type INode } from 'svgson';
import DEFAULT_ATTRS from '../tools/build-icons/render/default-attrs.json' with { type: 'json' };

const svgFiles = process.argv.slice(2);
const files = svgFiles.length
  ? svgFiles
  : (await fs.readdir('icons')).filter((file) => file.endsWith('.svg')).map((file) => path.join('icons', file));

let hasError = false;

function report(file: string, message: string) {
  console.error(`${file}: ${message}`);
  hasError = true;
}

function checkDuplicatedAttributes(file: string, svg: string) {
  for (const tag of svg.matchAll(/<([a-zA-Z][\w:-]*)([^<>]*?)\/?>/g)) {
    const tagName = tag[1];
    const attributes = tag[2];
    const seen = new Set<string>();

    for (const attribute of attributes.matchAll(/\s([^\s"'=<>/]+)\s*=/g)) {
      const name = attribute[1];
      if (seen.has(name)) {
        report(file, `<${tagName}> has duplicated "${name}" attribute.`);
      }
      seen.add(name);
    }
  }
}

function walk(file: string, node: INode) {
  const attributes = node.attributes ?? {};

  for (const attr of ['style', 'class']) {
    if (attr in attributes) {
      report(file, `<${node.name}> must not use "${attr}" attributes.`);
    }
  }

  for (const child of node.children ?? []) {
    if (typeof child !== 'string') {
      walk(file, child);
    }
  }
}

function checkRootAttributes(file: string, root: INode) {
  if (root.name !== 'svg') {
    report(file, 'root element must be <svg>.');
    return;
  }

  for (const [attr, value] of Object.entries(DEFAULT_ATTRS)) {
    const actual = root.attributes?.[attr];
    const expected = String(value);

    if (actual !== expected) {
      report(file, `<svg> "${attr}" must be "${expected}", got "${actual ?? 'missing'}".`);
    }
  }
}

for (const file of files) {
  const svg = await fs.readFile(file, 'utf-8');
  checkDuplicatedAttributes(file, svg);

  try {
    const root = parseSync(svg);
    checkRootAttributes(file, root);
    walk(file, root);
  } catch (error) {
    report(file, error instanceof Error ? error.message : String(error));
  }
}

if (hasError) {
  process.exit(1);
}
