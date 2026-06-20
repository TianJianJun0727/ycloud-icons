# YCloud Icons 文档站

YCloud Icons 文档站基于 VitePress 构建：https://vitepress.dev/
这是一个由 Vue 驱动的 Markdown 文档站。

## 开发

```sh
# Install dependencies
pnpm install
```

```sh
# Start docs dev server
pnpm docs:dev

# Start docs dev server with OG image generation
pnpm docs:dev:og

# Start api dev server
pnpm dev
```

## 构建

```sh
# Build docs
pnpm docs:build

# Build docs without generating per-page OG images
pnpm docs:build:no-og

# Build docs for GitHub Pages with fixed base and optional features disabled
pnpm docs:build:github-pages

# Build docs and generate llms.txt
pnpm docs:build:llms
```

`DOCS_OG` 可以作为统一开关使用：

```sh
DOCS_OG=0 pnpm docs:build
DOCS_OG=1 pnpm docs:dev:og
```

`docs:build:github-pages` 是 GitHub Pages 专用优化命令，会固定 `DOCS_BASE=/ycloud-icons/`，关闭 OG 和 `llms.txt`，启用 metadata chunk，清理已生成的逐页 OG 图片，跳过 API 构建，并跳过 Vercel 路由配置。
GitHub Actions 会按文档、图标源、分类、脚本和包源码的 hash 缓存最终静态产物；输入未变化时直接复用 `docs/.vercel/output/static`。
`DOCS_LLMS` 控制是否生成 `llms.txt`。默认关闭，避免双语文档和大量图标详情页场景下消耗过多内存。

```sh
# Build api
pnpm build:api
```

## 组件

组件和主题扩展位于 `.vitepress` 目录。
