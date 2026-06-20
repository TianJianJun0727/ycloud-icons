import { execSync } from 'node:child_process';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

type ReleaseEntry = {
  version: string;
  tag: string;
  date: string;
  compareUrl?: string;
  commits: string[];
};

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(currentDir, '..');
const changelogPath = path.resolve(projectRoot, 'CHANGELOG.md');
const englishChangelogPath = path.resolve(
  projectRoot,
  'docs/.vitepress/data/CHANGELOG.en.md',
);
const changelogSidebarPath = path.resolve(
  projectRoot,
  'docs/.vitepress/data/changelogSidebar.ts',
);

function run(command: string) {
  return execSync(command, {
    cwd: projectRoot,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
  }).trim();
}

function listTags() {
  const output = run(`git tag --list 'v*' --sort=-version:refname`);
  return output ? output.split('\n').filter(Boolean) : [];
}

function getTagDate(tag: string) {
  return run(`git log -1 --format=%cs ${tag}`);
}

function getCommits(currentTag: string, previousTag?: string) {
  if (!previousTag) {
    return ['首个正式版本发布。'];
  }

  const output = run(`git log --no-merges --format=%s ${previousTag}..${currentTag}`);
  const commits = output
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !/^chore\(release\):/i.test(line));

  return commits.length ? Array.from(new Set(commits)) : ['本版本没有记录到额外提交说明。'];
}

function getEnglishCommits(commits: string[], hasPreviousTag: boolean) {
  if (!hasPreviousTag && commits.length === 1 && commits[0] === '首个正式版本发布。') {
    return ['First stable release.'];
  }

  if (commits.length === 1 && commits[0] === '本版本没有记录到额外提交说明。') {
    return ['No additional commit notes were recorded for this release.'];
  }

  return commits;
}

function buildEntries(tags: string[]): ReleaseEntry[] {
  return tags.map((tag, index) => {
    const previousTag = tags[index + 1];
    const version = tag.replace(/^v/, '');

    return {
      version,
      tag,
      date: getTagDate(tag),
      compareUrl: previousTag
        ? `https://github.com/TianJianJun0727/ycloud-icons/compare/${previousTag}...${tag}`
        : undefined,
      commits: getCommits(tag, previousTag),
    };
  });
}

function getChangelogAnchor(version: string, date: string) {
  return `v${version.replace(/\./g, '-')}-${date}`;
}

function toMarkdown(entries: ReleaseEntry[], locale: 'zh' | 'en') {
  const isEnglish = locale === 'en';
  const lines = isEnglish
    ? [
        '# Changelog',
        '',
        '> This file is generated before the documentation build from Git tags and commit history.',
        '',
      ]
    : ['# 更新日志', '', '> 此文件会在文档构建前根据 Git tag 和提交记录自动生成。', ''];

  for (const [index, entry] of entries.entries()) {
    const releaseUrl = `https://github.com/TianJianJun0727/ycloud-icons/releases/tag/${entry.tag}`;
    const previousTagExists = index < entries.length - 1;
    const commits = isEnglish ? getEnglishCommits(entry.commits, previousTagExists) : entry.commits;

    lines.push(`## [${entry.tag}](${releaseUrl}) - ${entry.date}`);
    lines.push('');

    if (entry.compareUrl) {
      lines.push(`[${isEnglish ? 'View comparison' : '查看对比变更'}](${entry.compareUrl})`);
      lines.push('');
    }

    for (const commit of commits) {
      lines.push(`- ${commit}`);
    }

    lines.push('');
  }

  return `${lines.join('\n').trim()}\n`;
}

async function main() {
  const tags = listTags();

  if (!tags.length) {
    const fallback = '# 更新日志\n\n> 当前仓库还没有可用的版本标签。\n';
    const englishFallback = '# Changelog\n\n> No version tags are available in this repository yet.\n';
    await writeFile(changelogPath, fallback, 'utf8');
    await writeFile(englishChangelogPath, englishFallback, 'utf8');
    await writeFile(changelogSidebarPath, 'export default [];\n', 'utf8');
    return;
  }

  const entries = buildEntries(tags);
  const markdown = toMarkdown(entries, 'zh');
  const englishMarkdown = toMarkdown(entries, 'en');
  const sidebarItems = entries.map((entry) => ({
    text: `${entry.tag} · ${entry.date}`,
    link: `/changelog#${getChangelogAnchor(entry.version, entry.date)}`,
  }));

  await writeFile(changelogPath, markdown, 'utf8');
  await writeFile(englishChangelogPath, englishMarkdown, 'utf8');
  await writeFile(
    changelogSidebarPath,
    `const changelogSidebarItems = ${JSON.stringify(sidebarItems, null, 2)};\n\nexport default changelogSidebarItems;\n`,
    'utf8',
  );
}

await main();
