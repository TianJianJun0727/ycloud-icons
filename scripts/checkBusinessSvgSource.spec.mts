import { describe, expect, it } from 'vitest';
import { validateBusinessSvgSource } from './checkBusinessSvgSource.mts';

describe('validateBusinessSvgSource', () => {
  it('accepts ids referenced by href', () => {
    const svg =
      '<svg xmlns="http://www.w3.org/2000/svg"><symbol id="logo"/><use href="#logo"/></svg>';

    expect(validateBusinessSvgSource(svg, 'multicolor')).toEqual([]);
  });

  it('accepts ids referenced by xlink:href', () => {
    const svg =
      '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><image id="logo"/><use xlink:href="#logo"/></svg>';

    expect(validateBusinessSvgSource(svg, 'multicolor')).toEqual([]);
  });

  it('accepts fixed white but rejects other color variables for filled icons', () => {
    expect(
      validateBusinessSvgSource(
        '<svg viewBox="0 0 24 24" fill="var(--business-icon-primary-color)"><path fill="#fff" d="M4 4h16v16H4z"/></svg>',
        'filled',
      ),
    ).toEqual([]);
    expect(
      validateBusinessSvgSource(
        '<svg viewBox="0 0 24 24"><path fill="var(--legacy-color)" d="M4 4h16v16H4z"/></svg>',
        'filled',
      ),
    ).toEqual([
      '<path> must use "fill" as none or var(--business-icon-primary-color) or #fff.',
    ]);
  });
});
