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

function toMarkdown(entries: ReleaseEntry[]) {
  const lines = ['# 更新日志', '', '> 此文件会在文档构建前根据 Git tag 和提交记录自动生成。', ''];

  for (const entry of entries) {
    const releaseUrl = `https://github.com/TianJianJun0727/ycloud-icons/releases/tag/${entry.tag}`;

    lines.push(`## [${entry.tag}](${releaseUrl}) - ${entry.date}`);
    lines.push('');

    if (entry.compareUrl) {
      lines.push(`[查看对比变更](${entry.compareUrl})`);
      lines.push('');
    }

    for (const commit of entry.commits) {
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
    await writeFile(changelogPath, fallback, 'utf8');
    return;
  }

  const markdown = toMarkdown(buildEntries(tags));
  await writeFile(changelogPath, markdown, 'utf8');
}

await main();
