#!/usr/bin/env bash

set -e

export npm_config_registry="https://registry.npmmirror.com"
export COREPACK_NPM_REGISTRY="$npm_config_registry"

if ! command -v pnpm >/dev/null 2>&1; then
  if ! command -v corepack >/dev/null 2>&1; then
    npm install --global corepack@0.34.5
  fi

  corepack enable pnpm
fi

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
