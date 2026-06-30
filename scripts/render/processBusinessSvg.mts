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
  if (segments.includes('duotone')) return 'duotone';
  if (segments.includes('multicolor')) return 'multicolor';
  return 'mono';
}

function collectReferencedIds(svg: string) {
  return new Set([...svg.matchAll(/url\(#([^)]+)\)/g)].map((match) => match[1]));
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

type BusinessIconColorMode = 'mono' | 'duotone' | 'multicolor';

function normalizeColorValue(value: string, colorMode: BusinessIconColorMode) {
  if (value === 'none' || value.startsWith('var(')) {
    return value;
  }

  if (colorMode === 'multicolor') {
    return value;
  }

  if (colorMode === 'mono') {
    return 'currentColor';
  }

  if (value === 'currentColor') {
    return 'var(--business-icon-primary-color)';
  }

  return isWhiteColor(value)
    ? 'var(--business-icon-secondary-color)'
    : 'var(--business-icon-primary-color)';
}

function isWhiteColor(value: string) {
  const normalizedValue = value.trim().toLowerCase().replace(/\s+/g, '');
  return (
    normalizedValue === 'white' ||
    normalizedValue === '#fff' ||
    normalizedValue === '#ffffff' ||
    normalizedValue === '#ffffffff' ||
    normalizedValue === 'rgb(255,255,255)' ||
    normalizedValue === 'rgba(255,255,255,1)'
  );
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
  removeUnsafeNodes(root);
  cleanAttributes(root, referencedIds, colorMode);
  if (root.name.toLowerCase() === 'svg' && !root.attributes.fill) {
    if (colorMode === 'mono') {
      root.attributes.fill = 'currentColor';
    } else if (colorMode === 'duotone') {
      root.attributes.fill = 'var(--business-icon-primary-color)';
    }
  }
  return stringify(root);
}

export default function processBusinessSvg(svg: string, filePath: string) {
  return prettier.format(cleanBusinessSvg(svg, filePath), { parser: 'html' });
}
