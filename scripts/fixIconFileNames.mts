/**
 * Rename newly submitted icon source files to repository-safe kebab-case names.
 *
 * Figma submissions may keep the original layer names so that review/AI can
 * infer better semantic names. This script runs in the source-fix workflow and
 * renames non-standard SVG/JSON pairs before normal validation.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import z from 'zod';
import { createAiClient } from './aiClient.mts';

const FILENAME_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const renameSchema = z.object({
  items: z.array(
    z.object({
      sourceName: z.string(),
      targetName: z.string(),
    }),
  ),
});

type RenameTarget = {
  directory: string;
  sourceName: string;
  svgPath: string;
  jsonPath: string;
};

const toKebabCase = (value: string) =>
  value
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-')
    .toLowerCase();

function createStableNameHash(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash.toString(36);
}

function fallbackName(sourceName: string) {
  return toKebabCase(sourceName) || `figma-icon-${createStableNameHash(sourceName)}`;
}

async function fileExists(file: string) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

async function readJsonName(file: string) {
  try {
    const metadata = JSON.parse(await fs.readFile(file, 'utf-8')) as {
      name?: unknown;
      i18n?: { en?: { name?: unknown } };
    };
    return [metadata.i18n?.en?.name, metadata.name]
      .filter((value): value is string => typeof value === 'string' && value.trim().length > 0)
      .join(' / ');
  } catch {
    return '';
  }
}

async function collectTargets(files: string[]) {
  const sourceNames = new Map<string, RenameTarget>();

  for (const file of files) {
    const normalizedFile = file.split(path.sep).join('/');
    if (
      !/^icons\/[^/]+\.(?:svg|json)$/.test(normalizedFile) &&
      !/^business-icons\/[^/]+\/[^/]+\.(?:svg|json)$/.test(normalizedFile) &&
      !/^illustration-icons\/[^/]+\.(?:svg|json)$/.test(normalizedFile)
    ) {
      continue;
    }

    const extension = path.extname(normalizedFile);
    const sourceName = path.basename(normalizedFile, extension);
    if (FILENAME_PATTERN.test(sourceName)) {
      continue;
    }

    const directory = path.dirname(normalizedFile);
    const key = `${directory}/${sourceName}`;
    sourceNames.set(key, {
      directory,
      sourceName,
      svgPath: path.join(directory, `${sourceName}.svg`),
      jsonPath: path.join(directory, `${sourceName}.json`),
    });
  }

  const targets = [];
  for (const target of sourceNames.values()) {
    if ((await fileExists(target.svgPath)) || (await fileExists(target.jsonPath))) {
      targets.push(target);
    }
  }
  return targets;
}

async function suggestNames(targets: RenameTarget[]) {
  const ai = createAiClient({
    systemPrompt:
      'Return only JSON. Generate concise English lowercase kebab-case icon file names.',
  });

  const fallback = new Map(
    targets.map((target) => [target.sourceName, fallbackName(target.sourceName)]),
  );
  if (!ai) {
    return fallback;
  }

  const items = await Promise.all(
    targets.map(async (target) => ({
      sourceName: target.sourceName,
      metadataName: await readJsonName(target.jsonPath),
      directory: target.directory,
    })),
  );

  try {
    const response = await ai.completeJson(
      [
        'Rename icon source files for the YCloud Icons repository.',
        'Rules:',
        '- targetName must be lowercase kebab-case: a-z, 0-9, and hyphen only.',
        '- Use short semantic English names suitable for an icon package export.',
        '- Do not include words like icon, svg, business, illustration unless they are part of the meaning.',
        '- Preserve the source meaning from Chinese names or metadata names.',
        '',
        JSON.stringify({ items }, null, 2),
      ].join('\n'),
      'IconFileRenameSuggestions',
      renameSchema,
    );

    for (const item of response.items) {
      const normalized = toKebabCase(item.targetName);
      if (normalized) {
        fallback.set(item.sourceName, normalized);
      }
    }
  } catch (error) {
    console.warn(
      `AI icon filename suggestion failed, using fallback names: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }

  return fallback;
}

async function uniqueTargetPath(directory: string, targetName: string, sourceName: string) {
  let nextName = targetName;
  let suffix = 2;
  while (
    nextName !== sourceName &&
    ((await fileExists(path.join(directory, `${nextName}.svg`))) ||
      (await fileExists(path.join(directory, `${nextName}.json`))))
  ) {
    nextName = `${targetName}-${suffix}`;
    suffix += 1;
  }
  return nextName;
}

async function renamePair(target: RenameTarget, targetName: string) {
  const nextName = await uniqueTargetPath(target.directory, targetName, target.sourceName);
  if (nextName === target.sourceName) {
    return;
  }

  const nextSvgPath = path.join(target.directory, `${nextName}.svg`);
  const nextJsonPath = path.join(target.directory, `${nextName}.json`);

  if (await fileExists(target.svgPath)) {
    await fs.rename(target.svgPath, nextSvgPath);
  }
  if (await fileExists(target.jsonPath)) {
    await fs.rename(target.jsonPath, nextJsonPath);
  }

  console.log(
    `Renamed ${target.directory}/${target.sourceName} -> ${target.directory}/${nextName}`,
  );
}

async function main() {
  const files = process.argv.slice(2);
  const targets = await collectTargets(files);
  if (targets.length === 0) {
    console.log('No icon source files need filename normalization.');
    return;
  }

  const suggestions = await suggestNames(targets);
  for (const target of targets) {
    await renamePair(target, suggestions.get(target.sourceName) ?? fallbackName(target.sourceName));
  }
}

await main();
