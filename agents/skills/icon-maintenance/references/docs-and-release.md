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
pnpm exec oxfmt "changelogs/releases/vX.Y.Z.json"
RELEASE_VERSION=<version> YCLOUD_CHANGELOG_RELEASE_NOTES_PATH=.release-notes.md node scripts/writeGitHubReleaseNotes.mjs
```

Before publishing or deploying, verify:

1. the release JSON is formatted and its Chinese and English entries describe only the intended changes
2. `CHANGELOG.md` and `docs/.vitepress/data/CHANGELOG.en.md` contain the same release meaning
3. the release commit is on `main`
4. tag `vX.Y.Z` points to that commit
5. the package release completed successfully
6. the GitHub Release body matches the inspected bilingual release JSON
7. every published package reports version `X.Y.Z` on npm
8. docs deployment uses the intended package version

Only trigger workflows, edit GitHub releases, publish packages, or deploy docs when the user explicitly authorizes that external mutation.

## Stable release path

When the user asks for a stable path that automatically bumps the package version, writes changelog, publishes npm packages, and deploys docs, use the existing workflow chain instead of adding a new workflow:

```text
ci.yml workflow_dispatch
  -> creates release/vX.Y.Z branch
  -> runs scripts/syncPackageVersions.mts
  -> runs scripts/writeChangelog.mts
  -> formats changelogs/releases/vX.Y.Z.json
  -> opens the release PR
  -> waits for registered PR checks and stops on failure or timeout
  -> squash-merges only after all checks pass
  -> pushes tag vX.Y.Z on main
  -> release.yml publishes npm and creates GitHub Release
  -> release.yml triggers docs.yml with package_version=X.Y.Z
```

Trigger the full chain from `main`:

```sh
gh workflow run ci.yml --repo TianJianJun0727/ycloud-icons --ref main
```

Monitor the orchestration run first:

```sh
gh run list --repo TianJianJun0727/ycloud-icons --workflow ci.yml --limit 5
gh run watch <ci-run-id> --repo TianJianJun0727/ycloud-icons --exit-status
```

While the orchestration run is active, inspect the generated release PR instead of assuming generated notes are valid:

```sh
gh pr list --repo TianJianJun0727/ycloud-icons --head release/vX.Y.Z
gh pr diff <release-pr-number> --repo TianJianJun0727/ycloud-icons --patch
gh pr checks <release-pr-number> --repo TianJianJun0727/ycloud-icons
```

Review the release JSON and both generated changelog files in that diff. Do not use `gh pr merge --auto` as a CI gate. Without required status checks configured on the target branch, GitHub may merge immediately. The release workflow must explicitly wait until checks are registered and all are successful, must not merge while checks are pending, and must stop on failure or timeout.

After it succeeds, fetch tags and monitor the tag-triggered package release:

```sh
git fetch origin main --tags
git tag --list 'v*' --sort=-version:refname | head
gh run list --repo TianJianJun0727/ycloud-icons --workflow release.yml --limit 5
gh run watch <release-run-id> --repo TianJianJun0727/ycloud-icons --exit-status
```

Then monitor the docs deployment triggered by `release.yml`:

```sh
gh run list --repo TianJianJun0727/ycloud-icons --workflow docs.yml --limit 5
gh run watch <docs-run-id> --repo TianJianJun0727/ycloud-icons --exit-status
```

Use local scripts only to reproduce or repair the release preparation step:

```sh
node ./scripts/syncPackageVersions.mts <version>
YCLOUD_AI_CHANGELOG=1 YCLOUD_AI_CHANGELOG_VERSION=<version> node ./scripts/writeChangelog.mts
pnpm exec oxfmt "changelogs/releases/v<version>.json"
RELEASE_VERSION=<version> YCLOUD_CHANGELOG_RELEASE_NOTES_PATH=.release-notes.md node ./scripts/writeGitHubReleaseNotes.mjs
```

Do not create release tags from a local feature branch. The release tag must point to the merged release commit on `origin/main`, because `release.yml` rejects refs that are not in main history.

Do not manually publish package subsets unless the full release workflow failed after a package was already published. In that recovery case, re-run `release.yml` with the same `version`, `tag`, and release tag `ref`; the workflow skips packages that already exist on npm.
