# YCloud Icons 文档站

文档站基于 VitePress，页面内容位于 `docs/`，主题和导航配置位于 `docs/.vitepress/`。以下命令默认从仓库根目录执行。

## 本地开发

```sh
pnpm install

# 快速启动，默认关闭逐页 OG 图片生成
pnpm docs:dev

# 显式启用或关闭 OG 图片生成
pnpm docs:dev:og
pnpm docs:dev:no-og
```

如需同时调试 Nitro API，在另一个终端运行：

```sh
pnpm --dir docs dev
```

## 构建

```sh
# 完整文档构建
pnpm docs:build

# 跳过逐页 OG 图片，适合本地验收
pnpm docs:build:no-og

# GitHub Pages 构建：固定 base，并关闭 OG 与 llms.txt
pnpm docs:build:github-pages

# 额外生成 llms.txt
pnpm --dir docs docs:build:llms

# 单独构建 Nitro API
pnpm --dir docs build:api
```

可用环境变量：

- `DOCS_OG=1|0`：启用或关闭逐页 OG 图片生成
- `DOCS_LLMS=1|0`：启用或关闭 `llms.txt` 生成
- `DOCS_BASE`：设置部署 base path
- `DOCS_META_CHUNK=1`：启用 metadata chunk

`docs:build:github-pages` 会生成文档数据、清理旧 OG 图片、使用 `/ycloud-icons/` base 构建 VitePress，并跳过 Vercel 路由配置。GitHub Actions 会按文档、图标源、分类、脚本和包源码 hash 缓存最终静态产物。

## 内容约定

- 同步维护中文页面与 `docs/en/` 英文页面。
- 图标列表、详情、分类和 metadata 快照来自生成脚本，不手写生成产物。
- 修改资产说明时，以当前 schema、索引生成器和校验脚本为准。
- 本地验收优先运行 `pnpm docs:build:no-og`；只有验证 GitHub Pages 路径时才运行对应专用构建。
