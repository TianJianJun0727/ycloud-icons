import { describe, expect, it } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

describe('sprite.svg', () => {
  const spritePath = join(__dirname, '../sprite.svg');

  it('should exist', () => {
    expect(existsSync(spritePath)).toBe(true);
  });

  it('should be valid SVG', () => {
    if (!existsSync(spritePath)) {
      return; // Skip if not built yet
    }

    const content = readFileSync(spritePath, 'utf-8');
    expect(content).toContain('<svg');
    expect(content).toContain('xmlns="http://www.w3.org/2000/svg"');
    expect(content).toContain('</svg>');
  });

  it('should contain symbol elements', () => {
    if (!existsSync(spritePath)) {
      return; // Skip if not built yet
    }

    const content = readFileSync(spritePath, 'utf-8');
    expect(content).toContain('<symbol');
    expect(content).toContain('id=');
    expect(content).toContain('viewBox=');
  });

  it('should have valid symbol IDs', () => {
    if (!existsSync(spritePath)) {
      return; // Skip if not built yet
    }

    const content = readFileSync(spritePath, 'utf-8');
    const symbolMatches = content.match(/<symbol[^>]+id="([^"]+)"/g);

    if (symbolMatches) {
      expect(symbolMatches.length).toBeGreaterThan(0);

      // Check IDs are valid (no spaces, special chars)
      symbolMatches.forEach((match) => {
        const id = match.match(/id="([^"]+)"/)?.[1];
        expect(id).toBeTruthy();
        expect(id).toMatch(/^[a-z0-9-]+$/);
      });
    }
  });
});
