import { describe, expect, it } from 'vitest';
import { buildChineseTagsFromEnglish } from './fixIconTagsI18n.mts';

describe('buildChineseTagsFromEnglish', () => {
  it('uses i18n.en.tags order as the source of truth', () => {
    expect(
      buildChineseTagsFromEnglish(['heart rate monitor', 'ai', 'html'], {
        'heart rate monitor': '心率监测器',
        ai: 'AI',
        html: 'HTML',
      }),
    ).toEqual(['心率监测器', 'AI', 'HTML']);
  });

  it('throws when a translation is missing', () => {
    expect(() => buildChineseTagsFromEnglish(['missing'], {})).toThrow(
      'Missing Chinese tag translation: missing',
    );
  });
});
