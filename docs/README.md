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
```

`DOCS_OG` 可以作为统一开关使用：

```sh
DOCS_OG=0 pnpm docs:build
DOCS_OG=1 pnpm docs:dev:og
```

```sh
# Build api
pnpm build:api
```

## 组件

组件和主题扩展位于 `.vitepress` 目录。
