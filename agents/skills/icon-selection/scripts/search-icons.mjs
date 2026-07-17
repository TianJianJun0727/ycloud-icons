#!/usr/bin/env node
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import os from 'node:os';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

const bundledRepo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
const defaultRepo = fs.existsSync(path.join(bundledRepo, 'package.json'))
  ? bundledRepo
  : process.cwd();

const { values } = parseArgs({
  options: {
    query: { type: 'string', short: 'q' },
    kind: { type: 'string', short: 'k', default: 'all' },
    limit: { type: 'string', short: 'l', default: '12' },
    repo: {
      type: 'string',
      default: fs.existsSync(defaultRepo) ? defaultRepo : process.cwd(),
    },
    'metadata-url': {
      type: 'string',
      default: 'https://tianjianjun0727.github.io/ycloud-icons/metadata',
    },
    'cache-dir': {
      type: 'string',
      default: path.join(os.homedir(), '.cache', 'ycloud-icons-selection'),
    },
    'refresh-cache': { type: 'boolean', default: false },
    'no-cache': { type: 'boolean', default: false },
    'cache-info': { type: 'boolean', default: false },
    json: { type: 'boolean', default: false },
    help: { type: 'boolean', short: 'h', default: false },
  },
});

if (values.help) {
  console.log(`Search YCloud icons by metadata and source assets.

Usage:
  node search-icons.mjs --query <text> [options]

Options:
  -q, --query <text>          Semantic, product, or shape keywords
  -k, --kind <kind>           all | icon | business | illustration
  -l, --limit <number>        Maximum results (default: 12)
      --repo <path>           ycloud-icons repository root
      --json                  Print JSON output
      --refresh-cache         Rebuild the versioned cache
      --no-cache              Read sources without cache
      --cache-info            Print cache hit and version details
  -h, --help                  Show this help`);
  process.exit(0);
}

const repo = path.resolve(values.repo);
const query = values.query?.trim() ?? '';
const kind = values.kind;
const limit = Math.max(1, Number(values.limit) || 12);
const metadataUrl = String(values['metadata-url']).replace(/\/$/, '');
const cacheDir = path.resolve(String(values['cache-dir']));
const refreshCache = Boolean(values['refresh-cache']);
const noCache = Boolean(values['no-cache']);
const cacheInfo = Boolean(values['cache-info']);

const allowedKinds = new Set(['all', 'icon', 'business', 'business-icon', 'illustration']);
if (!allowedKinds.has(kind)) {
  console.error(`Invalid --kind "${kind}". Use all, icon, business, or illustration.`);
  process.exit(1);
}

if (!query) {
  console.error('Missing --query. Example: node search-icons.mjs --query "empty order"');
  process.exit(1);
}

const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));

const readJsonIfExists = (file) => {
  if (!fs.existsSync(file)) {
    return undefined;
  }
  return readJson(file);
};

const fetchJson = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return undefined;
    }
    return response.json();
  } catch {
    return undefined;
  }
};

const fetchMetadataHeaders = async (url) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    if (!response.ok) {
      return {};
    }
    return {
      etag: response.headers.get('etag'),
      lastModified: response.headers.get('last-modified'),
      contentLength: response.headers.get('content-length'),
    };
  } catch {
    return {};
  }
};

const hash = (value) => crypto.createHash('sha256').update(value).digest('hex').slice(0, 16);

const readGitOutput = (args) => {
  try {
    return execFileSync('git', args, {
      cwd: repo,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch {
    return '';
  }
};

const getLocalVersion = () => {
  if (!fs.existsSync(path.join(repo, '.git'))) {
    return '';
  }

  const head = readGitOutput(['rev-parse', 'HEAD']);
  const status = readGitOutput([
    'status',
    '--porcelain',
    '--',
    'icons',
    'business-icons',
    'illustration-icons',
    'categories',
    'docs/public/metadata',
  ]);

  return head ? `git:${head}:${hash(status)}` : '';
};

const getRemoteVersion = async () => {
  const version = await fetchJson(`${metadataUrl}/version.json`);
  if (version) {
    return `remote:${hash(JSON.stringify(version))}`;
  }

  const headers = await Promise.all(
    Object.values(metadataFiles).map((source) =>
      fetchMetadataHeaders(`${metadataUrl}/${source.remote}`),
    ),
  );
  return `remote:${hash(JSON.stringify(headers))}`;
};

const readCache = (cacheKey) => {
  if (noCache || refreshCache) {
    return undefined;
  }

  const file = path.join(cacheDir, `${cacheKey}.json`);
  if (!fs.existsSync(file)) {
    return undefined;
  }

  try {
    return readJson(file);
  } catch {
    return undefined;
  }
};

const writeCache = (cacheKey, payload) => {
  if (noCache) {
    return;
  }

  fs.mkdirSync(cacheDir, { recursive: true });
  fs.writeFileSync(path.join(cacheDir, `${cacheKey}.json`), `${JSON.stringify(payload)}\n`);
};

const walk = (dir, predicate) => {
  if (!fs.existsSync(dir)) {
    return [];
  }
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(file, predicate));
    } else if (predicate(file)) {
      files.push(file);
    }
  }
  return files;
};

const toPascalCase = (value) =>
  value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join('');

const tokenize = (value) =>
  String(value ?? '')
    .toLowerCase()
    .split(/[\s,;:/\\|()[\]{}"'`~!@#$%^&*_+=<>?.，。；：、（）【】《》]+/)
    .filter(Boolean);

const collectText = (...values) =>
  values
    .flat(Infinity)
    .filter((value) => value != null)
    .join(' ')
    .toLowerCase();

const flattenKeywords = (...values) =>
  values
    .flat(Infinity)
    .filter((value) => value != null)
    .map((value) => String(value).toLowerCase());

const queryTokens = tokenize(query);
const pageStateTokens = [
  '空',
  'empty',
  '失败',
  'failure',
  '无权限',
  'permission',
  'not-found',
  'not found',
  'network',
];
const fixedVisualTokens = [
  'whatsapp',
  'shopify',
  'meta',
  'alipay',
  '品牌',
  '渠道',
  '固定色',
  '双色',
  '多色',
];

const scoreItem = (item) => {
  const haystack = collectText(item.name, item.componentName, item.category, item.keywords);
  const primaryNames = flattenKeywords(item.name, item.componentName, item.primaryNames);
  const keywordValues = flattenKeywords(
    item.name,
    item.componentName,
    item.category,
    item.keywords,
  );
  const keywordTokens = new Set(keywordValues.flatMap((value) => tokenize(value)));
  let score = 0;
  for (const token of queryTokens) {
    if (item.name.toLowerCase() === token) score += 12;
    if (item.componentName.toLowerCase() === token.toLowerCase()) score += 10;
    if (primaryNames.includes(token)) score += 18;
    if (keywordValues.includes(token)) score += 10;
    if (keywordTokens.has(token)) score += 7;
    if (haystack.includes(token)) score += 4;
  }
  const baseScore = score;
  if (haystack.includes(query.toLowerCase())) score += 8;
  const isPageStateQuery = pageStateTokens.some((token) => query.toLowerCase().includes(token));
  if (item.kind === 'illustration' && isPageStateQuery && baseScore > 0) {
    score += 20;
  }
  if (item.kind !== 'illustration' && isPageStateQuery) {
    score -= 8;
  }
  if (
    item.kind === 'business-icon' &&
    baseScore > 0 &&
    fixedVisualTokens.some((token) => query.toLowerCase().includes(token))
  ) {
    score += 5;
  }
  return score;
};

const loadCategories = () => {
  const categoryDir = path.join(repo, 'categories');
  const categories = new Map();
  for (const file of walk(categoryDir, (candidate) => candidate.endsWith('.json'))) {
    const slug = path.basename(file, '.json');
    const data = readJson(file);
    categories.set(slug, {
      slug,
      title: data.title,
      enTitle: data.i18n?.en?.title,
    });
  }
  return categories;
};

const metadataFiles = {
  icon: {
    local: 'docs/public/metadata/icons.json',
    remote: 'icons.json',
  },
  'business-icon': {
    local: 'docs/public/metadata/business-icons.json',
    remote: 'business-icons.json',
  },
  illustration: {
    local: 'docs/public/metadata/illustration-icons.json',
    remote: 'illustration-icons.json',
  },
};

const loadMetadataSnapshot = async (assetKind) => {
  const source = metadataFiles[assetKind];
  const local = readJsonIfExists(path.join(repo, source.local));
  if (local?.assets) {
    return local;
  }
  return fetchJson(`${metadataUrl}/${source.remote}`);
};

const metadataKeywords = (metadata) =>
  [
    metadata?.name,
    metadata?.tags,
    metadata?.['use-cases'],
    metadata?.i18n?.en?.name,
    metadata?.i18n?.en?.tags,
    metadata?.i18n?.en?.['use-cases'],
  ]
    .flat(Infinity)
    .filter(Boolean);

const loadGenericIconsFromSnapshot = async () => {
  const snapshot = await loadMetadataSnapshot('icon');
  if (!snapshot?.assets) {
    return undefined;
  }
  const categories = loadCategories();
  return snapshot.assets.map((asset) => {
    const metadata = asset.metadata ?? {};
    const categoryLabels = (metadata.categories ?? []).flatMap((category) => {
      const categoryData = categories.get(category);
      return [category, categoryData?.title, categoryData?.enTitle].filter(Boolean);
    });
    return {
      kind: 'icon',
      priority: 1,
      name: asset.name,
      componentName: `${toPascalCase(asset.name)}Icon`,
      importPath: '@ycloud-web/icons-react',
      path: asset.path,
      category: (metadata.categories ?? []).join(', '),
      primaryNames: [asset.title, asset.englishName, metadata.name, metadata.i18n?.en?.name],
      keywords: [...metadataKeywords(metadata), ...categoryLabels],
      usage:
        'Preferred default for standard UI controls. Linear 24x24 icon; supports size, color, and stroke width.',
    };
  });
};

const loadGenericIconsFromSource = () => {
  const categories = loadCategories();
  const iconsDir = path.join(repo, 'icons');
  if (!fs.existsSync(iconsDir)) {
    return [];
  }
  return fs
    .readdirSync(iconsDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.svg'))
    .map((entry) => {
      const name = path.basename(entry.name, '.svg');
      const data = readJsonIfExists(path.join(iconsDir, `${name}.json`)) ?? {};
      const categoryLabels = (data.categories ?? []).flatMap((category) => {
        const categoryData = categories.get(category);
        return [category, categoryData?.title, categoryData?.enTitle].filter(Boolean);
      });
      return {
        kind: 'icon',
        priority: 1,
        name,
        componentName: `${toPascalCase(name)}Icon`,
        importPath: '@ycloud-web/icons-react',
        path: `icons/${name}.svg`,
        category: (data.categories ?? []).join(', '),
        primaryNames: [data.name, data.i18n?.en?.name],
        keywords: [
          data.name,
          data.tags,
          data['use-cases'],
          data.i18n?.en?.name,
          data.i18n?.en?.tags,
          data.i18n?.en?.['use-cases'],
          categoryLabels,
        ],
        usage:
          'Preferred default for standard UI controls. Linear 24x24 icon; supports size, color, and stroke width.',
      };
    });
};

const loadGenericIcons = async () =>
  (await loadGenericIconsFromSnapshot()) ?? loadGenericIconsFromSource();

const loadBusinessIconsFromSnapshot = async () => {
  const snapshot = await loadMetadataSnapshot('business-icon');
  if (!snapshot?.assets) {
    return undefined;
  }
  return snapshot.assets.map((asset) => {
    const colorMode = asset.colorMode ?? asset.category;
    const metadata = asset.metadata ?? {};
    const colorRule =
      colorMode === 'outlined'
        ? 'supports size, color, and stroke width when strokes exist'
        : colorMode === 'filled'
          ? 'supports size, primary color, secondary color, and stroke width when strokes exist'
          : 'supports size only; fixed multicolor artwork';
    return {
      kind: 'business-icon',
      priority: 2,
      name: asset.name,
      componentName: asset.componentName,
      importPath: '@ycloud-web/icons-react/business',
      path: asset.path,
      category: colorMode,
      primaryNames: [asset.title, asset.englishName, metadata.name, metadata.i18n?.en?.name],
      keywords: [
        asset.name,
        asset.componentName,
        colorMode,
        asset.title,
        asset.englishName,
        ...metadataKeywords(metadata),
      ],
      usage: `Fallback 24x24 business icon for legacy or fixed-color visuals; ${colorRule}.`,
    };
  });
};

const loadBusinessIconsFromSource = () => {
  const file = path.join(repo, 'business-icons/index.json');
  if (!fs.existsSync(file)) {
    return [];
  }
  const index = readJson(file);
  return (index.icons ?? []).map((icon) => {
    const colorMode = icon.category;
    const colorRule =
      colorMode === 'outlined'
        ? 'supports size, color, and stroke width when strokes exist'
        : colorMode === 'filled'
          ? 'supports size, primary color, secondary color, and stroke width when strokes exist'
          : 'supports size only; fixed multicolor artwork';
    return {
      kind: 'business-icon',
      priority: 2,
      name: icon.name,
      componentName: icon.componentName,
      importPath: '@ycloud-web/icons-react/business',
      path: icon.path,
      category: colorMode,
      primaryNames: [icon.name, icon.componentName],
      keywords: [icon.name, icon.componentName, colorMode],
      usage: `Fallback 24x24 business icon for legacy or fixed-color visuals; ${colorRule}.`,
    };
  });
};

const loadBusinessIcons = async () =>
  (await loadBusinessIconsFromSnapshot()) ?? loadBusinessIconsFromSource();

const loadIllustrationsFromSnapshot = async () => {
  const snapshot = await loadMetadataSnapshot('illustration');
  if (!snapshot?.assets) {
    return undefined;
  }
  return snapshot.assets.map((asset) => {
    const metadata = asset.metadata ?? {};
    return {
      kind: 'illustration',
      priority: 3,
      name: asset.name,
      componentName: asset.componentName,
      importPath: '@ycloud-web/icons-react/illustration',
      path: asset.path,
      category: asset.category ?? 'illustration',
      primaryNames: [asset.title, asset.englishName, metadata.name, metadata.i18n?.en?.name],
      keywords: [
        asset.name,
        asset.componentName,
        asset.title,
        asset.englishName,
        ...metadataKeywords(metadata),
      ],
      usage:
        'Large SVG illustration for empty states, error states, permission states, onboarding, or page-level visual feedback. Supports width and height only.',
    };
  });
};

const loadIllustrationsFromSource = () => {
  const file = path.join(repo, 'illustration-icons/index.json');
  if (!fs.existsSync(file)) {
    return [];
  }
  const index = readJson(file);
  return (index.illustrations ?? []).map((illustration) => ({
    kind: 'illustration',
    priority: 3,
    name: illustration.name,
    componentName: illustration.componentName,
    importPath: '@ycloud-web/icons-react/illustration',
    path: illustration.path,
    category: 'illustration',
    primaryNames: [illustration.name, illustration.componentName],
    keywords: [illustration.name, illustration.componentName],
    usage:
      'Large SVG illustration for empty states, error states, permission states, onboarding, or page-level visual feedback. Supports width and height only.',
  }));
};

const loadIllustrations = async () =>
  (await loadIllustrationsFromSnapshot()) ?? loadIllustrationsFromSource();

const loadAllItems = async () => [
  ...(kind === 'all' || kind === 'icon' ? await loadGenericIcons() : []),
  ...(kind === 'all' || kind === 'business' || kind === 'business-icon'
    ? await loadBusinessIcons()
    : []),
  ...(kind === 'all' || kind === 'illustration' ? await loadIllustrations() : []),
];

const localVersion = getLocalVersion();
const dataVersion = localVersion || (await getRemoteVersion());
const cacheKey = hash(
  JSON.stringify({
    script: 'ycloud-icons-selection/search-icons',
    version: 4,
    repo: localVersion ? repo : undefined,
    metadataUrl: localVersion ? undefined : metadataUrl,
    dataVersion,
    kind,
  }),
);
const cachedItems = readCache(cacheKey);
const allItems = cachedItems?.items ?? (await loadAllItems());

if (!cachedItems?.items) {
  writeCache(cacheKey, {
    dataVersion,
    cachedAt: new Date().toISOString(),
    items: allItems,
  });
}

if (cacheInfo) {
  console.error(
    `cache=${cachedItems?.items ? 'hit' : 'miss'} key=${cacheKey} version=${dataVersion}`,
  );
}

const confidenceForScore = (score) => {
  if (score >= 40) return 'high';
  if (score >= 18) return 'medium';
  return 'low';
};

const scored = allItems
  .map((item) => {
    const score = scoreItem(item);
    return { ...item, score, confidence: confidenceForScore(score) };
  })
  .filter((item) => item.score > 0)
  .sort(
    (left, right) =>
      right.score - left.score ||
      left.priority - right.priority ||
      left.name.localeCompare(right.name),
  )
  .slice(0, limit);

if (values.json) {
  console.log(JSON.stringify(scored, null, 2));
} else {
  if (scored.length === 0) {
    console.log('No matching YCloud icons found. Try broader semantic or shape keywords.');
  }
  for (const item of scored) {
    console.log(`${item.componentName} [${item.kind}] score=${item.score}`);
    console.log(`  import: ${item.importPath}`);
    console.log(`  source: ${item.path}`);
    console.log(`  confidence: ${item.confidence}`);
    console.log(`  usage: ${item.usage}`);
  }
}
