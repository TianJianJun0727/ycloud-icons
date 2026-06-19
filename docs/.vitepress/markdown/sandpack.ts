import type MarkdownIt from 'markdown-it';
import type { RenderRule } from 'markdown-it/lib/renderer.mjs';
import container from 'markdown-it-container';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sandpackTheme from '../theme/sandpackTheme.json';

type SnackParams = {
  defaultFiles?: Record<
    string,
    {
      code: string;
      active?: boolean;
      hidden?: boolean;
    }
  >;
};

type ContainerArgs = [typeof container, string, { render: RenderRule }];

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(currentDir, '../../..');
const packageVersionCache = new Map<string, string>();

function resolveSandboxDependencyVersion(packageName: string) {
  if (packageVersionCache.has(packageName)) {
    return packageVersionCache.get(packageName) as string;
  }

  const packagesDir = path.join(repoRoot, 'packages');
  const fallbackVersion = 'latest';

  try {
    const packageDirs = fs.readdirSync(packagesDir, { withFileTypes: true });

    for (const packageDir of packageDirs) {
      if (!packageDir.isDirectory()) continue;

      const packageJsonPath = path.join(packagesDir, packageDir.name, 'package.json');
      if (!fs.existsSync(packageJsonPath)) continue;

      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8')) as {
        name?: string;
        version?: string;
      };

      if (packageJson.name === packageName && packageJson.version) {
        packageVersionCache.set(packageName, packageJson.version);
        return packageJson.version;
      }
    }
  } catch {
    // Keep docs build resilient when a package is not part of this repository.
  }

  packageVersionCache.set(packageName, fallbackVersion);
  return fallbackVersion;
}

export default function sandpackPlugin(md: MarkdownIt, pluginOptions: SnackParams = {}) {
  if (md == null) {
    throw new Error('MarkdownIt instance is required for sandpackPlugin');
  }
  const escapeHtml = md?.utils?.escapeHtml;
  const defaultFence =
    md.renderer.rules.fence ||
    ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));

  const renderSandbox = (tokenList: any[], index: number) => {
    const renderFunc = (tokens: any[], idx: number) => {
      if (tokens[idx].nesting === 1) {
        const fileAttr: string[] = [];
        const attrs = Object.fromEntries(tokens[idx].attrs || []);

        const files: Record<
          string,
          {
            code: string;
            active?: boolean;
            hidden?: boolean;
          }
        > = {};

        for (
          let i = idx + 1;
          !(tokens[i].nesting === -1 && tokens[i].type === 'container_sandpack_close');
          ++i
        ) {
          if (tokens[i].type === 'fence' && tokens[i].tag === 'code') {
            const info = tokens[i].info ?? '';
            const [lang, fileName, params = ''] = info.split(' ');

            const active = params.includes('[active]');
            const hidden = params.includes('[hidden]');

            const code = tokens[i].content;

            if (fileName && code) {
              files[fileName] = {
                code,
              };

              if (active) {
                (files[fileName] as any).active = true;
              }

              if (hidden) {
                (files[fileName] as any).hidden = true;
              }
            }
          }
        }

        const { dependencies, showTabs, externalResources, editorWidthPercentage, ...options } =
          attrs;

        const dependencyList = dependencies?.split(',')?.map((dep: string) => dep.trim()) ?? [];

        const dependencyObject = dependencyList.reduce(
          (acc: Record<string, string>, name: string) => {
            acc[name] = resolveSandboxDependencyVersion(name);
            return acc;
          },
          {},
        );

        const externalResourcesList = externalResources
          ?.split(',')
          ?.map((res: string) => res.trim())
          ?.filter((res: string) => res.length > 0);

        const filesWithDefaultStyles = {
          ...pluginOptions.defaultFiles,
          ...files,
        };

        return `\
        <Sandpack\
          template="${escapeHtml(attrs.template || 'vanilla')}"\
          :theme="${escapeHtml(JSON.stringify(sandpackTheme))}"\
          :customSetup="${escapeHtml(
            dependencyList
              ? JSON.stringify({
                  dependencies: dependencyList.length ? dependencyObject : {},
                })
              : undefined,
          )}"
          :files="${escapeHtml(JSON.stringify(filesWithDefaultStyles))}"\
          :options="${escapeHtml(
            JSON.stringify({
              ...(showTabs ? { showTabs: JSON.parse(showTabs) } : {}),
              externalResources: externalResourcesList,
              editorWidthPercentage: editorWidthPercentage
                ? Number(editorWidthPercentage)
                : undefined,
              ...options,
            }),
          )}"\
        >`;
      }
      return `</Sandpack>`;
    };
    return renderFunc(tokenList, index);
  };

  function createCodeGroup(md: MarkdownIt): ContainerArgs {
    return [
      container,
      'sandpack',
      {
        render(tokens, idx) {
          return renderSandbox(tokens, idx);
        },
      },
    ];
  }

  md.use(...createCodeGroup(md));
}
