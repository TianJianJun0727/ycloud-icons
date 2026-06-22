import { describe, expect, it } from 'vitest';
import { migrateIconUseCases } from './migrateIconUseCasesI18n.mts';

describe('migrateIconUseCases', () => {
  it('moves existing English use-cases into i18n.en and writes translated Chinese use-cases at the top level', () => {
    const metadata = {
      $schema: '../icon.schema.json',
      'use-cases': ['add to favorites', 'star item'],
      name: '星标加号',
      tags: ['书签', '星标'],
      categories: ['social'],
      i18n: {
        en: {
          name: 'star plus',
          tags: ['favorite', 'star'],
        },
      },
    };

    expect(
      migrateIconUseCases(metadata, {
        translateUseCase: (value) =>
          ({
            'add to favorites': '添加到收藏',
            'star item': '星标项目',
          })[value] ?? value,
      }),
    ).toEqual({
      $schema: '../icon.schema.json',
      'use-cases': ['添加到收藏', '星标项目'],
      name: '星标加号',
      tags: ['书签', '星标'],
      categories: ['social'],
      i18n: {
        en: {
          name: 'star plus',
          tags: ['favorite', 'star'],
          'use-cases': ['add to favorites', 'star item'],
        },
      },
    });
  });

  it('keeps empty use-cases arrays in both languages when the original field is empty', () => {
    const metadata = {
      $schema: '../icon.schema.json',
      'use-cases': [],
      name: '箭头上',
      tags: ['前进'],
      categories: ['arrows'],
      i18n: {
        en: {
          name: 'arrow up',
          tags: ['direction'],
        },
      },
    };

    expect(migrateIconUseCases(metadata)).toEqual({
      $schema: '../icon.schema.json',
      'use-cases': [],
      name: '箭头上',
      tags: ['前进'],
      categories: ['arrows'],
      i18n: {
        en: {
          name: 'arrow up',
          tags: ['direction'],
          'use-cases': [],
        },
      },
    });
  });

  it('is idempotent after use-cases have already been split by language', () => {
    const metadata = {
      $schema: '../icon.schema.json',
      'use-cases': ['添加到收藏'],
      name: '星标加号',
      tags: ['书签'],
      categories: ['social'],
      i18n: {
        en: {
          name: 'star plus',
          tags: ['favorite'],
          'use-cases': ['add to favorites'],
        },
      },
    };

    expect(migrateIconUseCases(metadata)).toEqual(metadata);
  });
});
