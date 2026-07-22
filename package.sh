#!/usr/bin/env bash

set -e

corepack enable
corepack prepare pnpm@11.6.0 --activate

pnpm config set registry https://registry.npmmirror.com
pnpm install --frozen-lockfile

pnpm --filter @ycloud-web/icons build
pnpm --filter @ycloud-web/icons-react build
pnpm --filter @ycloud-web/icons-vue build

DOCS_BASE="${DOCS_BASE:-/}" \
DOCS_OG=0 \
DOCS_LLMS=0 \
DOCS_META_CHUNK=1 \
DOCS_VERCEL=0 \
DOCS_OUT_DIR=../dist \
NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=8192}" \
pnpm docs:build:no-og

echo "Docs build completed: dist"
