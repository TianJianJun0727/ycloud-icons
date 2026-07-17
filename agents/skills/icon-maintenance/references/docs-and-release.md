# Docs, packages, CI, and release

## Docs and search data

Run:

```sh
pnpm docs:build:no-og
```

Use `pnpm docs:dev:no-og` only for visual inspection. Generated docs data and metadata snapshots may include:

- `docs/.vitepress/data/iconNodes`
- `docs/.vitepress/data/iconDetails`
- Git metadata JSON files
- `docs/public/metadata/icons.json`
- `docs/public/metadata/business-icons.json`
- `docs/public/metadata/illustration-icons.json`

If search or detail pages are stale, verify source indexes and metadata generation before editing Vue components.

## Package generation

Framework packages call `scripts/generateBusinessIconsPackage.mts` and `scripts/generateIllustrationsPackage.mts` from their `build:icons` scripts. Regenerate only affected targets unless the generator itself changed.

Examples:

```sh
pnpm --filter @ycloud-web/icons-react build:icons
pnpm --filter @ycloud-web/icons-data build:icons
pnpm --filter @ycloud-web/icons-vue build:icons
```

Then run the affected package test or build required by its `package.json`.

## CI diagnosis

Start from the first failing step and reproduce its exact command locally. Inspect the workflow before changing code:

```sh
gh run view <run-id> --log-failed
```

Relevant workflows include:

- `.github/workflows/fix-icon-source.yml`
- `.github/workflows/auto-merge-icon-source.yml`
- `.github/workflows/ci.yml`
- `.github/workflows/release.yml`
- `.github/workflows/docs.yml`

Do not treat later successful runs as proof that the original failure did not occur; keep failure and recovery evidence separate.

## Changelog and release

Treat `changelogs/releases/vX.Y.Z.json` as the source for release notes and generated changelog output. Use repository scripts instead of manually duplicating content:

```sh
pnpm generate:changelog
RELEASE_VERSION=<version> YCLOUD_CHANGELOG_RELEASE_NOTES_PATH=.release-notes.md node scripts/writeGitHubReleaseNotes.mjs
```

Before publishing or deploying, verify:

1. the release commit is on `main`
2. tag `vX.Y.Z` points to that commit
3. the package release completed successfully
4. docs deployment uses the intended package version

Only trigger workflows, edit GitHub releases, publish packages, or deploy docs when the user explicitly authorizes that external mutation.
