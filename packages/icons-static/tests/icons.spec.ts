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

    // Test first icon is a string
    const firstIcon = icons[iconNames[0] as keyof typeof icons];
    expect(typeof firstIcon).toBe('string');
    expect(firstIcon.length).toBeGreaterThan(0);
  });

  it('should have valid SVG strings', () => {
    const iconNames = Object.keys(icons);
    const firstIcon = icons[iconNames[0] as keyof typeof icons];

    expect(firstIcon).toContain('<svg');
    expect(firstIcon).toContain('xmlns="http://www.w3.org/2000/svg"');
    expect(firstIcon).toContain('viewBox=');
    expect(firstIcon).toContain('</svg>');
  });

  it('should have ycloud class', () => {
    const iconNames = Object.keys(icons);
    const firstIcon = icons[iconNames[0] as keyof typeof icons];

    expect(firstIcon).toContain('class="ycloud');
  });
});
