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
});
