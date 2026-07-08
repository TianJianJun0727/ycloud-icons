import { describe, expect, it } from 'vitest';
import * as icons from '../src/ycloud-static';

describe('icons-static', () => {
  it('should export icons object', () => {
    expect(icons).toBeDefined();
    expect(typeof icons).toBe('object');
  });

  it('should have valid icon structure', () => {
    const iconNames = Object.keys(icons);
    expect(iconNames.length).toBeGreaterThan(0);

    // Test first icon has required properties
    const firstIcon = icons[iconNames[0] as keyof typeof icons];
    expect(firstIcon).toHaveProperty('name');
    expect(firstIcon).toHaveProperty('attrs');
    expect(firstIcon).toHaveProperty('node');
    expect(Array.isArray(firstIcon.node)).toBe(true);
  });

  it('should have valid SVG attributes', () => {
    const iconNames = Object.keys(icons);
    const firstIcon = icons[iconNames[0] as keyof typeof icons];

    expect(firstIcon.attrs).toHaveProperty('xmlns');
    expect(firstIcon.attrs.xmlns).toBe('http://www.w3.org/2000/svg');
    expect(firstIcon.attrs).toHaveProperty('viewBox');
  });

  it('should have valid node structure', () => {
    const iconNames = Object.keys(icons);
    const firstIcon = icons[iconNames[0] as keyof typeof icons];

    expect(Array.isArray(firstIcon.node)).toBe(true);
    if (firstIcon.node.length > 0) {
      const [tagName, attrs] = firstIcon.node[0];
      expect(typeof tagName).toBe('string');
      expect(typeof attrs).toBe('object');
    }
  });
});
