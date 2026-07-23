/**
 * Process a business SVG with minimal cleanup.
 *
 * Business icons keep their original geometry and stroke details. The cleanup
 * removes unsafe SVG content and normalizes configurable colors by color mode.
 */
import * as prettier from 'prettier';
import { parseSync, stringify, type INode } from 'svgson';

function getBusinessIconColorMode(filePath: string) {
  const segments = filePath.split(/[\\/]/);
  if (segments.includes('filled')) return 'filled';
  if (segments.includes('multicolor')) return 'multicolor';
  return 'outlined';
}

function collectReferencedIds(svg: string) {
  return new Set([
    ...[...svg.matchAll(/url\(#([^)]+)\)/g)].map((match) => match[1]),
    ...[...svg.matchAll(/(?:href|xlink:href)=["']#([^"']+)["']/g)].map((match) => match[1]),
  ]);
}

function removeUnsafeNodes(node: INode) {
  node.children = (node.children ?? []).filter((child) => {
    if (typeof child === 'string') {
      return true;
    }

    const name = child.name.toLowerCase();
    if (name === 'script' || name === 'foreignobject') {
      return false;
    }

    removeUnsafeNodes(child);
    return true;
  });
}

type BusinessIconColorMode = 'outlined' | 'filled' | 'multicolor';

function collectPaintValues(node: INode, values = new Set<string>()) {
  for (const attr of ['fill', 'stroke']) {
    const value = node.attributes?.[attr];
    if (typeof value === 'string' && value.toLowerCase() !== 'none') {
      values.add(value.trim().toLowerCase());
    }
  }

  for (const child of node.children ?? []) {
    if (typeof child !== 'string') {
      collectPaintValues(child, values);
    }
  }

  return values;
}

function validateFilledPaints(root: INode) {
  const paintValues = collectPaintValues(root);
  const hasUnsupportedBusinessColorToken = [...paintValues].some(
    (value) =>
      value.startsWith('var(--business-icon-') && value !== 'var(--business-icon-primary-color)',
  );
  if (hasUnsupportedBusinessColorToken || paintValues.size > 1) {
    throw new Error(
      `Filled business SVGs must use one paint color. Convert background-colored details to transparent compound-path cutouts or use multicolor. Found: ${[
        ...paintValues,
      ].join(', ')}.`,
    );
  }
}

function normalizeColorValue(value: string, colorMode: BusinessIconColorMode) {
  if (value === 'none') {
    return value;
  }

  if (colorMode === 'multicolor') {
    return value;
  }

  if (colorMode === 'outlined') {
    return 'currentColor';
  }

  return 'var(--business-icon-primary-color)';
}

function cleanAttributes(
  node: INode,
  referencedIds: Set<string>,
  colorMode: BusinessIconColorMode,
) {
  const attributes = node.attributes ?? {};

  for (const attr of Object.keys(attributes)) {
    const value = attributes[attr];

    if (
      /^on/i.test(attr) ||
      attr === 'class' ||
      attr === 'style' ||
      /^data-/i.test(attr) ||
      (attr === 'id' && !referencedIds.has(String(value)))
    ) {
      delete attributes[attr];
      continue;
    }

    if (typeof value === 'string' && /javascript\s*:/i.test(value)) {
      delete attributes[attr];
      continue;
    }

    if (/^(fill|stroke)$/i.test(attr) && typeof value === 'string') {
      attributes[attr] = normalizeColorValue(value, colorMode);
    }
  }

  node.attributes = attributes;

  for (const child of node.children ?? []) {
    if (typeof child !== 'string') {
      cleanAttributes(child, referencedIds, colorMode);
    }
  }
}

function cleanBusinessSvg(svg: string, filePath: string) {
  const root = parseSync(svg);
  const referencedIds = collectReferencedIds(svg);
  const colorMode = getBusinessIconColorMode(filePath);
  if (colorMode === 'filled') {
    validateFilledPaints(root);
  }
  removeUnsafeNodes(root);
  cleanAttributes(root, referencedIds, colorMode);
  if (root.name.toLowerCase() === 'svg' && !root.attributes.fill) {
    if (colorMode === 'outlined') {
      root.attributes.fill = 'currentColor';
    } else if (colorMode === 'filled') {
      root.attributes.fill = 'var(--business-icon-primary-color)';
    }
  }
  return stringify(root);
}

export default function processBusinessSvg(svg: string, filePath: string) {
  return prettier.format(cleanBusinessSvg(svg, filePath), { parser: 'html' });
}
