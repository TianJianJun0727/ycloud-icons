import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { readAssetMetadata, writeAssetMetadata, type AssetMetadata } from './assetMetadata.mts';

let tempDir: string;

const metadata: AssetMetadata = {
  $schema: '../asset-metadata.schema.json',
  name: '空列表',
  tags: ['空列表', '暂无数据'],
  'use-cases': ['列表为空'],
  i18n: {
    en: {
      name: 'empty list',
      tags: ['empty list', 'empty'],
      'use-cases': ['Empty list'],
    },
  },
};

beforeEach(async () => {
  tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'ycloud-asset-metadata-'));
});

afterEach(async () => {
  await fs.rm(tempDir, { recursive: true, force: true });
});

describe('asset metadata helpers', () => {
  it('reads single asset metadata without requiring aggregate index fields', async () => {
    const file = path.join(tempDir, 'empty-list.json');
    await fs.writeFile(file, `${JSON.stringify(metadata, null, 2)}\n`, 'utf8');

    await expect(readAssetMetadata(file)).resolves.toEqual(metadata);
  });

  it('rejects aggregate metadata index shape when reading a single asset file', async () => {
    const file = path.join(tempDir, 'index.json');
    await fs.writeFile(
      file,
      JSON.stringify({
        metadataVersion: 1,
        type: 'illustration',
        assets: [],
      }),
      'utf8',
    );

    await expect(readAssetMetadata(file)).rejects.toThrow(/missing or invalid \$schema/);
  });

  it('writes metadata atomically and creates parent directories', async () => {
    const file = path.join(tempDir, 'nested', 'empty-list.json');

    await writeAssetMetadata(file, metadata);

    await expect(readAssetMetadata(file)).resolves.toEqual(metadata);
    await expect(fs.readdir(path.dirname(file))).resolves.toEqual(['empty-list.json']);
  });
});
