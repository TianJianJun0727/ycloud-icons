import { h } from 'preact';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { Base64 } from 'js-base64';
import { FRAME_NAME } from '../../common/constants';
import {
  getBusinessSvgIssues,
  getBusinessIconNameIssues,
  getTargetIconName,
  getIconNameIssues,
  getIconNameWarnings,
  getIllustrationSvgIssues,
  getSvgIssues,
  sanitizeBusinessSvg,
  sanitizeIllustrationSvg,
  sanitizeSvg,
} from '../../common/iconRules';
import type { IconSourceType, YCloudIconData } from '../../common/types';
import { useAppDispatch, useAppState } from '../contexts/AppContext';
import styles from './Deploy.module.css';

type Category = {
  key: string;
  title: string;
  englishTitle: string;
};

type GitHubTree = {
  tree: Array<{
    path: string;
    type: string;
  }>;
  truncated?: boolean;
};

type GitHubContentJsonEnvelope = {
  content?: unknown;
  encoding?: unknown;
};

type IconMetadataIndex = {
  assets?: Array<{
    name?: string;
    metadata?: {
      aliases?: Array<string | { name?: string }>;
    };
  }>;
};

type IllustrationIndex = {
  categories?: Array<{
    name?: unknown;
    title?: unknown;
    i18n?: {
      en?: {
        title?: unknown;
      };
    };
  }>;
};

const GITHUB_API_VERSION = '2022-11-28';
const businessColorModes = [
  { value: 'outlined', label: '描边', description: 'business-icons/outlined' },
  { value: 'filled', label: '填充', description: 'business-icons/filled' },
  { value: 'multicolor', label: '多色', description: 'business-icons/multicolor' },
] as const;

const getSourceIconName = (name: string, data: YCloudIconData) => data.figma?.name || name;

const getCategoryLabel = (category: Category | undefined, fallback: string) => {
  if (!category) return fallback;
  if (!category.englishTitle || category.englishTitle === category.title) return category.title;
  return `${category.title} / ${category.englishTitle}`;
};

const getStringValue = (value: unknown, fallback: string) =>
  typeof value === 'string' && value.trim().length > 0 ? value : fallback;

const createGitHubReadHeaders = (
  apiKey?: string,
  accept = 'application/vnd.github+json',
): HeadersInit => {
  const headers: Record<string, string> = {
    'X-GitHub-Api-Version': GITHUB_API_VERSION,
    Accept: accept,
  };
  const token = apiKey?.trim();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

const sleep = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

const isRetriableGitHubStatus = (status: number) =>
  status === 408 ||
  status === 429 ||
  status === 500 ||
  status === 502 ||
  status === 503 ||
  status === 504;

async function fetchGitHubRead(
  url: string,
  apiKey?: string,
  accept = 'application/vnd.github+json',
): Promise<Response> {
  const token = apiKey?.trim();
  let lastError: unknown;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: createGitHubReadHeaders(token, accept),
      });
      if (response.status === 401 && token) {
        return fetch(url, {
          headers: createGitHubReadHeaders(undefined, accept),
        });
      }
      if (!isRetriableGitHubStatus(response.status) || attempt === 2) {
        return response;
      }
      lastError = new Error(`${response.status} ${response.statusText}`);
    } catch (error) {
      lastError = error;
      if (attempt === 2) {
        break;
      }
    }
    await sleep(400 * (attempt + 1));
  }
  throw lastError instanceof Error ? lastError : new Error('GitHub 网络请求失败。');
}

async function readGitHubRawJson<T>(url: string, apiKey?: string): Promise<T> {
  const response = await fetchGitHubRead(url, apiKey, 'application/vnd.github.raw+json');
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  const parsed = JSON.parse(await response.text()) as T | GitHubContentJsonEnvelope;
  const envelopeContent = (parsed as GitHubContentJsonEnvelope | undefined)?.content;
  if (parsed && typeof parsed === 'object' && typeof envelopeContent === 'string') {
    const content = envelopeContent.replace(/\s/g, '');
    if (!content) {
      throw new Error('GitHub JSON 文件内容为空，无法同步数据。');
    }
    return JSON.parse(Base64.decode(content)) as T;
  }
  return parsed as T;
}

async function readGitHubOptionalRawJson<T>(url: string, apiKey?: string): Promise<T | undefined> {
  try {
    return await readGitHubRawJson<T>(url, apiKey);
  } catch {
    return undefined;
  }
}

const uniqueList = (items: string[]) =>
  items.filter((item, index, list) => list.indexOf(item) === index);

const collectIconMetadataNames = (index: IconMetadataIndex | undefined) =>
  uniqueList(
    (index?.assets ?? [])
      .flatMap((asset) => [
        asset.name,
        ...(asset.metadata?.aliases ?? []).map((alias) =>
          typeof alias === 'string' ? alias : alias.name,
        ),
      ])
      .filter((name): name is string => typeof name === 'string' && name.length > 0),
  );

function getGitHubSyncErrorMessage(error: unknown) {
  if (error instanceof TypeError && error.message === 'Failed to fetch') {
    return '同步数据失败：GitHub 网络请求失败，请检查 Figma 网络权限、代理或稍后重试。';
  }
  return error instanceof Error ? `同步数据失败：${error.message}` : '同步数据失败。';
}

interface DeployProps {
  sourceType: IconSourceType;
  setSourceType: (sourceType: IconSourceType) => void;
}

const Deploy = ({ sourceType, setSourceType }: DeployProps) => {
  const dispatch = useAppDispatch();
  const {
    isDeploying,
    githubData,
    iconPreview,
    githubApiKey,
    githubRepositoryUrl,
    pngOption,
    ycloudMetadata,
    deployResult,
  } = useAppState();
  const [categories, setCategories] = useState<Category[]>([]);
  const [existingGenericIconNames, setExistingGenericIconNames] = useState<string[]>([]);
  const [existingBusinessIconNames, setExistingBusinessIconNames] = useState<string[]>([]);
  const [existingIllustrationNames, setExistingIllustrationNames] = useState<string[]>([]);
  const [categoryQuery, setCategoryQuery] = useState('');
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [categoryMessage, setCategoryMessage] = useState('');
  const [selectedIconNames, setSelectedIconNames] = useState<string[]>([]);
  const [allowExistingIconUpdate, setAllowExistingIconUpdate] = useState(false);
  const [isRawOpen, setIsRawOpen] = useState(false);
  const [previewDialogIconName, setPreviewDialogIconName] = useState<string | undefined>();
  const hasAutoLoadedCategories = useRef(false);
  const previousIconNamesRef = useRef<Set<string>>(new Set());
  const previousSourceTypeRef = useRef<IconSourceType>(sourceType);
  const icons = Object.entries(iconPreview);
  const existingIconNames =
    sourceType === 'business'
      ? existingBusinessIconNames
      : sourceType === 'illustration'
        ? existingIllustrationNames
        : existingGenericIconNames;
  const sourceTypeLabel =
    sourceType === 'business' ? '业务图标' : sourceType === 'illustration' ? '插画' : '通用图标';
  const syncStatusMessage =
    categoryMessage === 'synced'
      ? sourceType === 'business'
        ? `已同步 ${businessColorModes.length} 个颜色模式、${existingBusinessIconNames.length} 个业务图标。`
        : sourceType === 'illustration'
          ? `已同步 ${categories.length} 个插画分类、${existingIllustrationNames.length} 个插画。`
          : `已同步 ${categories.length} 个已有分类、${existingGenericIconNames.length} 个通用图标。`
      : categoryMessage;
  const existingIconSet = useMemo(() => new Set(existingIconNames), [existingIconNames]);
  const sourceTypeItemName = sourceType === 'illustration' ? '插画' : '图标';
  const getTargetIconKey = (name: string, data?: YCloudIconData) =>
    getTargetIconName(data?.figma?.name, data?.name, name);
  const targetIconNameCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const [name, data] of icons) {
      const targetName = getTargetIconKey(name, data);
      counts.set(targetName, (counts.get(targetName) ?? 0) + 1);
    }
    return counts;
  }, [icons]);
  const selectedIconSet = useMemo(() => new Set(selectedIconNames), [selectedIconNames]);
  const selectedIcons = useMemo(
    () => icons.filter(([name]) => selectedIconSet.has(name)),
    [icons, selectedIconSet],
  );
  const iconQualityByName = useMemo(() => {
    return new Map(
      icons.map(([name, data]) => {
        const sourceName = getSourceIconName(name, data);
        const svg = data.svg;
        const cleanedSvg = sanitizeSvg(svg);
        const targetName = getTargetIconKey(name, data);
        const issues =
          sourceType === 'business'
            ? [...getBusinessIconNameIssues(sourceName), ...getBusinessSvgIssues(svg)]
            : sourceType === 'illustration'
              ? [...getBusinessIconNameIssues(sourceName), ...getIllustrationSvgIssues(svg)]
              : [...getIconNameIssues(sourceName), ...getSvgIssues(cleanedSvg)];
        if ((targetIconNameCounts.get(targetName) ?? 0) > 1) {
          issues.push(`本次预览中存在重复目标名：${targetName}`);
        }
        const warnings = [
          ...getIconNameWarnings(sourceName),
          ...(sourceType === 'generic' && svg.trim() !== cleanedSvg.trim()
            ? ['SVG 会在提交时自动清洗。']
            : []),
        ];
        return [name, { issues, warnings }];
      }),
    );
  }, [icons, sourceType]);
  const getIconQuality = (name: string) =>
    iconQualityByName.get(name) ?? { issues: [], warnings: [] };
  const deployableSelectedIcons = useMemo(
    () =>
      selectedIcons.filter(([name, data]) => {
        const quality = getIconQuality(name);
        const isExistingIcon = existingIconSet.has(getTargetIconKey(name, data));
        return quality.issues.length === 0 && (allowExistingIconUpdate || !isExistingIcon);
      }),
    [
      allowExistingIconUpdate,
      existingIconSet,
      iconQualityByName,
      selectedIcons,
      sourceType,
      ycloudMetadata.businessColorMode,
      targetIconNameCounts,
    ],
  );
  const skippedExistingIconCount = selectedIcons.length - deployableSelectedIcons.length;
  const previewDialogIcon = useMemo(
    () => icons.find(([name]) => name === previewDialogIconName),
    [icons, previewDialogIconName],
  );
  const previewDialogIssues = useMemo(() => {
    if (!previewDialogIcon) return [];
    const [name, data] = previewDialogIcon;
    const isExistingIcon = existingIconSet.has(getTargetIconKey(name, data));
    return [
      ...(isExistingIcon && !allowExistingIconUpdate ? ['已存在同名图标，当前未开启覆盖。'] : []),
      ...getIconQuality(name).issues,
    ];
  }, [allowExistingIconUpdate, existingIconSet, iconQualityByName, previewDialogIcon]);
  const selectedIconPreview = useMemo(
    () =>
      Object.fromEntries(
        deployableSelectedIcons.map(([name, data]) => [
          name,
          {
            ...data,
            svg:
              sourceType === 'business'
                ? sanitizeBusinessSvg(data.svg, ycloudMetadata.businessColorMode)
                : sourceType === 'illustration'
                  ? sanitizeIllustrationSvg(data.svg)
                  : sanitizeSvg(data.svg),
          },
        ]),
      ),
    [deployableSelectedIcons, sourceType, ycloudMetadata.businessColorMode],
  );

  useEffect(() => {
    const nextIconNames = icons.map(([name]) => name);
    const nextIconNameSet = new Set(nextIconNames);
    const previousIconNameSet = previousIconNamesRef.current;
    const didSourceTypeChange = previousSourceTypeRef.current !== sourceType;
    setSelectedIconNames((current) => {
      const currentSet = new Set(current);
      const isSelectable = (name: string) => {
        const normalizedName = getTargetIconKey(name, iconPreview[name]);
        const quality = getIconQuality(name);
        return (
          quality.issues.length === 0 &&
          (allowExistingIconUpdate || !existingIconSet.has(normalizedName))
        );
      };
      if (didSourceTypeChange) {
        return nextIconNames.filter(isSelectable);
      }
      const retained = current.filter((name) => nextIconNameSet.has(name) && isSelectable(name));
      const added = nextIconNames.filter(
        (name) => !currentSet.has(name) && !previousIconNameSet.has(name) && isSelectable(name),
      );
      return [...retained, ...added];
    });
    previousIconNamesRef.current = nextIconNameSet;
    previousSourceTypeRef.current = sourceType;
  }, [
    allowExistingIconUpdate,
    existingIconSet,
    iconPreview,
    iconQualityByName,
    sourceType,
    ycloudMetadata.businessColorMode,
  ]);

  useEffect(() => {
    if (!previewDialogIconName) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPreviewDialogIconName(undefined);
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [previewDialogIconName]);

  const updateMetadata = (patch: Partial<typeof ycloudMetadata>) => {
    dispatch({
      name: 'SET_YCLOUD_METADATA',
      payload: {
        ycloud: {
          ...ycloudMetadata,
          ...patch,
        },
      },
    });
  };

  const deploy = () => {
    dispatch({
      name: 'DEPLOY_ICON',
      payload: {
        icons: selectedIconPreview,
        githubData,
        options: {
          sourceType,
          png: pngOption,
          fileName:
            sourceType === 'business'
              ? 'business-icons'
              : sourceType === 'illustration'
                ? 'illustration'
                : 'icons',
          ycloud: ycloudMetadata,
          allowExistingIconUpdate,
        },
      },
    });
  };

  const toggleCategory = (categoryKey: string) => {
    if (sourceType === 'illustration') {
      updateMetadata({
        categories: [categoryKey],
      });
      return;
    }
    const nextCategories = ycloudMetadata.categories.includes(categoryKey)
      ? ycloudMetadata.categories.filter((key) => key !== categoryKey)
      : [...ycloudMetadata.categories, categoryKey];
    updateMetadata({
      categories: Array.from(new Set(nextCategories)),
    });
  };

  const loadCategories = async () => {
    if (!githubData.owner || !githubData.name || !githubApiKey) {
      setCategoryMessage('请先在设置页保存连接设置。');
      return;
    }
    setIsLoadingCategories(true);
    setCategoryMessage('');
    try {
      const apiUrl = `https://api.github.com/repos/${githubData.owner}/${githubData.name}`;
      const [categoryData, illustrationIndex, treeResponse] = await Promise.all([
        readGitHubOptionalRawJson<
          Array<{ name?: unknown; title?: unknown; englishTitle?: unknown }>
        >(`${apiUrl}/contents/docs/.vitepress/data/categoriesData.json?ref=main`, githubApiKey),
        readGitHubOptionalRawJson<IllustrationIndex>(
          `${apiUrl}/contents/illustration-icons/index.json?ref=main`,
          githubApiKey,
        ),
        fetchGitHubRead(`${apiUrl}/git/trees/main?recursive=1`, githubApiKey),
      ]);
      if (!treeResponse.ok) {
        throw new Error(`${treeResponse.status} ${treeResponse.statusText}`);
      }
      const tree = (await treeResponse.json()) as GitHubTree;
      if (tree.truncated) {
        throw new Error('GitHub main 分支文件树返回结果被截断，无法安全判断同名覆盖。');
      }
      const [genericMetadata, businessMetadata, illustrationMetadata] = await Promise.all([
        readGitHubOptionalRawJson<IconMetadataIndex>(
          `${apiUrl}/contents/icons/metadata/index.json?ref=main`,
          githubApiKey,
        ),
        readGitHubOptionalRawJson<IconMetadataIndex>(
          `${apiUrl}/contents/business-icons/metadata/index.json?ref=main`,
          githubApiKey,
        ),
        readGitHubOptionalRawJson<IconMetadataIndex>(
          `${apiUrl}/contents/illustration-icons/metadata/index.json?ref=main`,
          githubApiKey,
        ),
      ]);
      const treeGenericIconNames = tree.tree
        .filter((item) => item.type === 'blob' && /^icons\/[^/]+\.svg$/.test(item.path))
        .map((item) => item.path.replace(/^icons\//, '').replace(/\.svg$/, ''));
      const nextExistingIconNames = Array.from(
        new Set([...treeGenericIconNames, ...collectIconMetadataNames(genericMetadata)]),
      );
      const treeBusinessIconNames = tree.tree
        .filter(
          (item) => item.type === 'blob' && /^business-icons\/[^/]+\/[^/]+\.svg$/.test(item.path),
        )
        .map((item) => item.path.replace(/^business-icons\/[^/]+\//, '').replace(/\.svg$/, ''));
      const nextExistingIllustrationNames = tree.tree
        .filter(
          (item) =>
            item.type === 'blob' && /^illustration-icons\/[^/]+\/[^/]+\.svg$/.test(item.path),
        )
        .map((item) => item.path.replace(/^illustration-icons\/[^/]+\//, '').replace(/\.svg$/, ''));
      const nextExistingBusinessIconNames = Array.from(
        new Set([...treeBusinessIconNames, ...collectIconMetadataNames(businessMetadata)]),
      );
      const nextExistingIllustrationNamesWithAliases = Array.from(
        new Set([
          ...nextExistingIllustrationNames,
          ...collectIconMetadataNames(illustrationMetadata),
        ]),
      );
      const genericCategories = (categoryData ?? [])
        .filter((item) => typeof item.name === 'string' && item.name.length > 0)
        .map((item) => {
          const key = item.name as string;
          const title = getStringValue(item.title, key);
          return {
            key,
            title,
            englishTitle: getStringValue(item.englishTitle, key),
          };
        });
      const illustrationCategories = (illustrationIndex?.categories ?? [])
        .filter((item) => typeof item.name === 'string' && item.name.length > 0)
        .map((item) => {
          const key = item.name as string;
          const title = getStringValue(item.title, key);
          return {
            key,
            title,
            englishTitle: getStringValue(item.i18n?.en?.title, key),
          };
        });
      const missingCategoryData = tree.tree
        .filter((item) => item.type === 'blob' && /^categories\/[^/]+\.json$/.test(item.path))
        .map((item) => item.path.replace(/^categories\//, '').replace(/\.json$/, ''))
        .filter((key) => !genericCategories.some((category) => category.key === key))
        .map((key) => ({
          key,
          title: key,
          englishTitle: key,
        }));
      const missingIllustrationCategoryData = tree.tree
        .filter(
          (item) =>
            item.type === 'blob' && /^illustration-icons\/[^/]+\/[^/]+\.svg$/.test(item.path),
        )
        .map((item) => item.path.replace(/^illustration-icons\//, '').split('/')[0])
        .filter((key) => key && !illustrationCategories.some((category) => category.key === key))
        .map((key) => ({
          key,
          title: key === 'other' ? '其他' : key,
          englishTitle: key === 'other' ? 'Other' : key,
        }));
      const nextCategories =
        sourceType === 'illustration'
          ? [
              ...illustrationCategories,
              ...missingIllustrationCategoryData,
              ...(illustrationCategories.some((category) => category.key === 'other')
                ? []
                : [{ key: 'other', title: '其他', englishTitle: 'Other' }]),
            ]
          : [...genericCategories, ...missingCategoryData];
      setCategories(
        nextCategories.sort((left, right) =>
          getStringValue(left.title, left.key).localeCompare(
            getStringValue(right.title, right.key),
            'zh-Hans-CN',
          ),
        ),
      );
      setExistingGenericIconNames(nextExistingIconNames);
      setExistingBusinessIconNames(nextExistingBusinessIconNames);
      setExistingIllustrationNames(nextExistingIllustrationNamesWithAliases);
      setCategoryMessage('synced');
    } catch (error) {
      setCategoryMessage(getGitHubSyncErrorMessage(error));
    } finally {
      setIsLoadingCategories(false);
    }
  };

  useEffect(() => {
    if (
      hasAutoLoadedCategories.current ||
      isLoadingCategories ||
      categories.length > 0 ||
      !githubData.owner ||
      !githubData.name ||
      !githubApiKey
    ) {
      return;
    }
    hasAutoLoadedCategories.current = true;
    void loadCategories();
  }, [categories.length, githubApiKey, githubData.name, githubData.owner, isLoadingCategories]);

  const allCategoryOptions = useMemo(
    () =>
      categories.filter(
        (category, index, array) => array.findIndex((item) => item.key === category.key) === index,
      ),
    [categories],
  );
  const categoryByKey = useMemo(
    () => new Map(allCategoryOptions.map((category) => [category.key, category])),
    [allCategoryOptions],
  );
  const filteredCategories = allCategoryOptions.filter((category) => {
    const query = categoryQuery.trim().toLowerCase();
    if (!query) return true;
    return [category.key, category.title, category.englishTitle]
      .join(' ')
      .toLowerCase()
      .includes(query);
  });
  const missingRequirements = [
    githubRepositoryUrl === '' ? '目标仓库' : '',
    githubApiKey === '' ? '访问凭证' : '',
    icons.length === 0 ? '图标源' : '',
    deployableSelectedIcons.length === 0 ? '本次提交图标' : '',
    sourceType === 'generic' && ycloudMetadata.categories.length === 0 ? '分类' : '',
    sourceType === 'illustration' && ycloudMetadata.categories.length === 0 ? '分类' : '',
    sourceType === 'business' && ycloudMetadata.businessColorMode === undefined ? '颜色模式' : '',
  ].filter(Boolean);
  const canDeploy =
    githubApiKey !== '' &&
    githubRepositoryUrl !== '' &&
    deployableSelectedIcons.length > 0 &&
    (sourceType === 'business'
      ? ycloudMetadata.businessColorMode !== undefined
      : ycloudMetadata.categories.length > 0) &&
    !isDeploying;

  return (
    <div className={styles.container}>
      <section className={styles.card}>
        <div className={styles.row}>
          <div>
            <h2 className={styles.title}>提交{sourceTypeLabel}</h2>
            <p className={styles.muted}>
              读取当前选中的{sourceTypeItemName}或区块；未选择时读取 <strong>{FRAME_NAME}</strong>。
            </p>
          </div>
          <span className={[styles.badge, icons.length > 0 ? styles.badgeReady : ''].join(' ')}>
            {icons.length} 个{sourceTypeItemName}
          </span>
        </div>
        <div className={styles.repoLine}>
          <span className={styles.label}>目标图标库</span>
          {githubData.owner && githubData.name ? (
            <a
              className={styles.link}
              target="_blank"
              href={`https://github.com/${githubData.owner}/${githubData.name}`}
              rel="noreferrer"
            >
              {githubData.owner}/{githubData.name}
            </a>
          ) : (
            <span className={styles.muted}>请先完成连接设置</span>
          )}
        </div>
        <div className={styles.sourceSelector}>
          <span className={styles.label}>提交类型</span>
          <div className={styles.sourceOptions}>
            <button
              className={[
                styles.sourceOption,
                sourceType === 'generic' ? styles.sourceOptionActive : '',
              ].join(' ')}
              type="button"
              onClick={() => {
                setSourceType('generic');
              }}
            >
              通用图标
            </button>
            <button
              className={[
                styles.sourceOption,
                sourceType === 'business' ? styles.sourceOptionActive : '',
              ].join(' ')}
              type="button"
              onClick={() => {
                setSourceType('business');
              }}
            >
              业务图标
            </button>
            <button
              className={[
                styles.sourceOption,
                sourceType === 'illustration' ? styles.sourceOptionActive : '',
              ].join(' ')}
              type="button"
              onClick={() => {
                setSourceType('illustration');
                updateMetadata({ categories: ['other'] });
              }}
            >
              插画
            </button>
          </div>
        </div>
        <p className={styles.sourceHint}>
          {sourceType === 'business'
            ? '当前提交到 business-icons/<颜色模式>/*.svg。'
            : sourceType === 'illustration'
              ? '当前提交到 illustration-icons/<分类>/*.svg；插画不要求 24x24，预览按容器等比缩放，提交时保留原始颜色和尺寸属性。'
              : '当前提交到 icons/*.svg，并提交所选分类。'}
        </p>
      </section>

      {sourceType === 'business' && (
        <section className={styles.card}>
          <h2 className={styles.title}>颜色模式</h2>
          <div className={styles.row}>
            <p className={styles.muted}>选择业务图标的颜色模式，用于决定提交目录和颜色处理方式。</p>
            <button
              className={styles.secondaryButton}
              type="button"
              disabled={isLoadingCategories}
              onClick={loadCategories}
            >
              {isLoadingCategories ? '刷新中' : '刷新数据'}
            </button>
          </div>
          {syncStatusMessage && (
            <p
              className={[
                styles.message,
                categoryMessage.includes('失败') ? styles.messageError : '',
              ].join(' ')}
            >
              {syncStatusMessage}
            </p>
          )}
          <div className={styles.fieldGroup}>
            <span className={styles.label}>颜色模式</span>
            <select
              className={styles.input}
              value={ycloudMetadata.businessColorMode}
              onChange={(event) => {
                updateMetadata({
                  businessColorMode: event.currentTarget.value as 'outlined' | 'filled' | 'multicolor',
                  businessCategory: event.currentTarget.value,
                });
              }}
            >
              {businessColorModes.map((mode) => (
                <option
                  key={mode.value}
                  value={mode.value}
                >
                  {mode.label} / {mode.description}
                </option>
              ))}
            </select>
            <p className={styles.muted}>
              图标将提交到{' '}
              <strong>
                business-icons/
                {ycloudMetadata.businessColorMode}/
              </strong>
              目录。
            </p>
          </div>
        </section>
      )}

      {(sourceType === 'generic' || sourceType === 'illustration') && (
        <section className={styles.card}>
          <div className={styles.row}>
            <div>
              <h2 className={styles.title}>分类</h2>
              <p className={styles.muted}>
                {sourceType === 'illustration'
                  ? '选择目标插画分类；不确定分类时选择 other。'
                  : '选择目标图标库中已有分类。'}
              </p>
            </div>
            <button
              className={styles.secondaryButton}
              type="button"
              disabled={isLoadingCategories}
              onClick={loadCategories}
            >
              {isLoadingCategories ? '刷新中' : '刷新分类'}
            </button>
          </div>
          {syncStatusMessage && (
            <p
              className={[
                styles.message,
                categoryMessage.includes('失败') ? styles.messageError : '',
              ].join(' ')}
            >
              {syncStatusMessage}
            </p>
          )}
          <div className={styles.fieldGroup}>
            <input
              className={styles.input}
              placeholder="搜索分类名称或标识"
              value={categoryQuery}
              onInput={(event) => {
                setCategoryQuery(event.currentTarget.value);
              }}
            />
          </div>
          <div className={styles.selectedTags}>
            {ycloudMetadata.categories.length > 0 ? (
              ycloudMetadata.categories.map((categoryKey) => {
                const category = categoryByKey.get(categoryKey);
                return (
                  <span
                    key={categoryKey}
                    className={styles.tag}
                  >
                    {getCategoryLabel(category, categoryKey)}
                    <button
                      className={styles.tagButton}
                      type="button"
                      aria-label={`移除分类 ${getCategoryLabel(category, categoryKey)}`}
                      onClick={() => {
                        toggleCategory(categoryKey);
                      }}
                    >
                      ×
                    </button>
                  </span>
                );
              })
            ) : (
              <span className={styles.muted}>尚未选择分类</span>
            )}
          </div>
          <div className={styles.categoryList}>
            {filteredCategories.map((category) => (
              <div
                key={category.key}
                className={styles.categoryItem}
              >
                <label className={styles.checkboxLabel}>
                  <input
                    className={styles.checkbox}
                    type={sourceType === 'illustration' ? 'radio' : 'checkbox'}
                    name={sourceType === 'illustration' ? 'illustration-category' : undefined}
                    checked={ycloudMetadata.categories.includes(category.key)}
                    onChange={() => {
                      toggleCategory(category.key);
                    }}
                  />
                  <span className={styles.checkboxBox} />
                  <span className={styles.categoryText}>
                    <span className={styles.categoryTitle}>{category.title}</span>
                    <span className={styles.categoryMeta}>
                      {category.englishTitle || category.title}
                    </span>
                  </span>
                </label>
              </div>
            ))}
            {filteredCategories.length === 0 && (
              <div className={styles.empty}>
                <p className={styles.title}>暂无分类</p>
                <p className={styles.muted}>请先刷新目标图标库分类，或调整搜索关键词。</p>
              </div>
            )}
          </div>
        </section>
      )}

      <section className={styles.card}>
        <div className={styles.row}>
          <h2 className={styles.title}>预览</h2>
          <p className={styles.muted}>
            将提交 {deployableSelectedIcons.length} / {icons.length} 个
          </p>
        </div>
        <div className={styles.row}>
          <p className={styles.muted}>
            {existingIconNames.length > 0
              ? `已自动跳过同名${sourceTypeLabel}，避免重复提交。`
              : `可覆盖目标目录中同名${sourceTypeLabel}。`}
          </p>
          <label className={styles.checkboxLabel}>
            <input
              className={styles.checkbox}
              type="checkbox"
              checked={allowExistingIconUpdate}
              onChange={(event) => {
                setAllowExistingIconUpdate(event.currentTarget.checked);
              }}
            />
            <span className={styles.checkboxBox} />
            覆盖已存在{sourceTypeLabel}
          </label>
        </div>
        {skippedExistingIconCount > 0 && !allowExistingIconUpdate && (
          <p className={styles.message}>
            本次已跳过 {skippedExistingIconCount} 个已存在{sourceTypeLabel}。
          </p>
        )}
        {icons.length > 0 && (
          <div className={styles.previewActions}>
            <button
              className={styles.secondaryButton}
              type="button"
              onClick={() => {
                setSelectedIconNames(
                  icons
                    .filter(([name, data]) => {
                      const quality = getIconQuality(name);
                      return (
                        quality.issues.length === 0 &&
                        (allowExistingIconUpdate ||
                          !existingIconSet.has(getTargetIconKey(name, data)))
                      );
                    })
                    .map(([name]) => name),
                );
              }}
            >
              选择可提交{sourceTypeItemName}
            </button>
            <button
              className={styles.secondaryButton}
              type="button"
              onClick={() => {
                setSelectedIconNames([]);
              }}
            >
              清空
            </button>
          </div>
        )}
        <div className={styles.preview}>
          {icons.map(([name, data]) => {
            const { svg } = data;
            const targetIconName = getTargetIconKey(name, data);
            const isExistingIcon = existingIconSet.has(targetIconName);
            const isDisabledExistingIcon = isExistingIcon && !allowExistingIconUpdate;
            const quality = getIconQuality(name);
            const isBlockedIcon = quality.issues.length > 0;
            const isDisabledIcon = isDisabledExistingIcon || isBlockedIcon;
            const disabledReasons = [
              ...(isDisabledExistingIcon ? ['已存在同名图标，当前未开启覆盖。'] : []),
              ...quality.issues,
            ];
            const previewSvg =
              sourceType === 'business'
                ? sanitizeBusinessSvg(svg, ycloudMetadata.businessColorMode)
                : sourceType === 'illustration'
                  ? sanitizeIllustrationSvg(svg)
                  : sanitizeSvg(svg);
            const previewLabel = getSourceIconName(name, data);
            return (
              <div
                className={[
                  styles.previewItem,
                  selectedIconSet.has(name) ? styles.previewItemSelected : '',
                  isDisabledIcon ? styles.previewItemBlocked : '',
                ].join(' ')}
                key={name}
              >
                <div className={styles.previewItemHeader}>
                  <label
                    className={styles.previewCheckbox}
                    aria-label={`选择${sourceTypeItemName} ${previewLabel}`}
                  >
                    <input
                      className={styles.checkbox}
                      type="checkbox"
                      checked={selectedIconSet.has(name)}
                      disabled={isDisabledExistingIcon || isBlockedIcon}
                      onChange={(event) => {
                        const checked = event.currentTarget.checked;
                        setSelectedIconNames((current) => {
                          if (checked) {
                            return Array.from(new Set([...current, name]));
                          }
                          return current.filter((item) => item !== name);
                        });
                      }}
                    />
                    <span className={styles.checkboxBox} />
                  </label>
                  <span
                    className={[
                      styles.previewStatus,
                      isDisabledIcon ? styles.previewStatusError : '',
                    ].join(' ')}
                  >
                    {isDisabledIcon ? '不可提交' : '可提交'}
                  </span>
                </div>
                <button
                  className={[
                    styles.previewIconButton,
                    sourceType === 'illustration' ? styles.previewIllustrationButton : '',
                  ].join(' ')}
                  type="button"
                  aria-label={
                    disabledReasons.length > 0
                      ? `放大预览 ${previewLabel}，${disabledReasons.join('，')}`
                      : `放大预览 ${previewLabel}`
                  }
                  onClick={() => {
                    setPreviewDialogIconName(name);
                  }}
                >
                  <span
                    className={[
                      styles.previewIcon,
                      sourceType === 'illustration' ? styles.previewIllustrationIcon : '',
                    ].join(' ')}
                    dangerouslySetInnerHTML={{ __html: previewSvg }}
                  />
                </button>
                <p
                  className={styles.previewName}
                  title={previewLabel}
                >
                  {previewLabel}
                </p>
                <p
                  className={isDisabledIcon ? styles.previewInlineError : styles.previewTargetName}
                  title={isDisabledIcon ? disabledReasons.join('；') : targetIconName}
                >
                  {isDisabledIcon ? disabledReasons[0] : targetIconName}
                </p>
              </div>
            );
          })}
          {icons.length === 0 && (
            <div className={[styles.empty, styles.previewEmpty].join(' ')}>
              <p className={styles.title}>还没有可提交的{sourceTypeItemName}</p>
              <p className={styles.muted}>
                请在画布中准备名为 {FRAME_NAME} 的画框或区块，并放入
                {sourceTypeItemName}。
              </p>
            </div>
          )}
        </div>
        <button
          className={styles.disclosureButton}
          type="button"
          onClick={() => {
            setIsRawOpen((next) => !next);
          }}
        >
          查看原始数据
          <span>{isRawOpen ? '收起' : '展开'}</span>
        </button>
        {isRawOpen && (
          <textarea
            className={styles.rawData}
            rows={8}
            readOnly
            value={JSON.stringify(selectedIconPreview, null, 2)}
          />
        )}
      </section>

      {previewDialogIcon && (
        <div
          className={styles.dialogOverlay}
          role="presentation"
          onClick={() => {
            setPreviewDialogIconName(undefined);
          }}
        >
          <section
            className={styles.previewDialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="preview-dialog-title"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <div className={styles.dialogHeader}>
              <div>
                <h2
                  id="preview-dialog-title"
                  className={styles.dialogTitle}
                >
                  {getSourceIconName(previewDialogIcon[0], previewDialogIcon[1])}
                </h2>
                <p className={styles.dialogMeta}>
                  目标名：{getTargetIconKey(previewDialogIcon[0], previewDialogIcon[1])}
                </p>
              </div>
              <button
                className={styles.dialogCloseButton}
                type="button"
                aria-label="关闭预览"
                onClick={() => {
                  setPreviewDialogIconName(undefined);
                }}
              >
                ×
              </button>
            </div>
            {previewDialogIssues.length > 0 && (
              <div className={styles.dialogIssues}>
                <p className={styles.dialogIssuesTitle}>当前不可提交</p>
                <ul className={styles.dialogIssueList}>
                  {previewDialogIssues.map((issue) => (
                    <li key={issue}>{issue}</li>
                  ))}
                </ul>
              </div>
            )}
            <div
              className={styles.dialogIcon}
              dangerouslySetInnerHTML={{
                __html:
                  sourceType === 'business'
                    ? sanitizeBusinessSvg(
                        previewDialogIcon[1].svg,
                        ycloudMetadata.businessColorMode,
                      )
                    : sourceType === 'illustration'
                      ? sanitizeIllustrationSvg(previewDialogIcon[1].svg)
                      : sanitizeSvg(previewDialogIcon[1].svg),
              }}
            />
          </section>
        </div>
      )}

      {deployResult && (
        <section
          className={[
            styles.status,
            deployResult.status === 'error' ? styles.statusError : '',
          ].join(' ')}
        >
          <strong>{deployResult.status === 'success' ? '提交成功' : '提交失败'}</strong>
          <p>{deployResult.message}</p>
          {deployResult.url && (
            <a
              className={styles.link}
              href={deployResult.url}
              target="_blank"
              rel="noreferrer"
            >
              打开审核单
            </a>
          )}
        </section>
      )}

      <section className={styles.footer}>
        {missingRequirements.length > 0 ? (
          <p className={styles.footerHint}>待补充：{missingRequirements.join('、')}</p>
        ) : deployResult ? (
          deployResult.url ? (
            <a
              className={[styles.footerHint, styles.link].join(' ')}
              href={deployResult.url}
              target="_blank"
              rel="noreferrer"
            >
              {deployResult.message}
            </a>
          ) : (
            <p className={styles.footerHint}>{deployResult.message}</p>
          )
        ) : (
          <p className={styles.footerHint}>
            {sourceType === 'business'
              ? '清洗：移除脚本、事件属性、style/class/data-*、未引用 id 和 javascript: 链接；按颜色模式处理 fill/stroke，不添加通用描边属性。'
              : sourceType === 'illustration'
                ? '清洗：仅移除脚本、事件属性、style/class/data-*、未引用 id 和 javascript: 链接；不做 24x24 尺寸清洗，保留原始颜色和尺寸属性。'
                : '清洗：统一 24x24 viewBox、currentColor、stroke-width=2、round linecap/linejoin，并移除 style 和硬编码颜色。'}
          </p>
        )}
        <button
          className={styles.primaryButton}
          type="button"
          disabled={!canDeploy}
          onClick={deploy}
        >
          {isDeploying ? '提交中' : `提交${sourceTypeLabel}`}
        </button>
      </section>
    </div>
  );
};

export default Deploy;
