# Capability map

Use this map to choose the smallest local command or GitHub Action that matches the requested maintenance task. Prefer local scripts for source changes and reproducible fixes; use GitHub Actions only when the user explicitly asks for remote CI, PR automation, publishing, or deployment.

## Local source maintenance

| Capability | Command or script | Use when |
| --- | --- | --- |
| Optimize generic SVGs | `pnpm optimize` / `scripts/optimizeSvgs.mts` | raw generic SVGs were added or changed |
| Optimize business SVGs | `pnpm optimize:business` / `scripts/optimizeBusinessSvgs.mts` | raw business SVGs were added or changed |
| Optimize staged generic SVGs | `scripts/optimizeStagedSvgs.mts` | fixing only currently staged generic SVGs |
| Optimize staged business SVGs | `scripts/optimizeStagedBusinessSvgs.mts` | fixing only currently staged business SVGs |
| Add missing generic metadata | `pnpm addjsons` / `scripts/addMissingIconMetadataFiles.mts` | generic SVG exists without matching JSON |
| Add missing category metadata | `pnpm addcategoryjsons` / `scripts/addMissingCategoryMetadataFiles.mts` | category JSON files are missing |
| Fix metadata language/schema issues | `scripts/fixMetadata.mts` | metadata has mechanical field or language issues |
| Suggest metadata | `pnpm suggest:metadata` / `pnpm suggest:metadata:watch` | user wants AI-assisted metadata suggestions |
| Polish tags by category | `pnpm polish:tags` / `scripts/polishIconTagsByCategory.mts` | tags need batch semantic cleanup |
| Rename one icon | `pnpm rename -- ...` / `scripts/rename/renameIcon.mts` | a single icon and references must be renamed |
| Rename by pattern | `pnpm renamePattern -- ...` / `scripts/rename/renamePattern.mts` | multiple icon filenames need a mechanical rename |
| Fix file names | `scripts/fixIconFileNames.mts` | filename normalization is required before validation |

## Local indexes and metadata

| Capability | Command or script | Use when |
| --- | --- | --- |
| Generic icon/category validation | `pnpm checkIcons` | generic icon JSON/category consistency changed |
| Business index generation | `pnpm generate:business-index` | business SVG or JSON files changed |
| Illustration index generation | `pnpm generate:illustration-index` | illustration SVG or JSON files changed |
| Asset metadata aggregation | `pnpm generate:asset-metadata` | any `icons`, `business-icons`, or `illustration-icons` metadata changed |
| Next.js aliases | `pnpm generate:nextJSAliases` | alias exports or Next.js alias data changed |
| Sponsors data | `pnpm generate:sponsors` | sponsor source data changed |
| Changelog data | `pnpm generate:changelog` | release notes or changelog pages need regeneration |
| GitHub release notes sync | `pnpm sync:github-release-notes` | persisted release notes must be written back to GitHub Releases |
| Package version sync | `pnpm sync:package-versions -- <version>` | all package versions must be aligned before release |

## Local validation

| Capability | Command | Use when |
| --- | --- | --- |
| Generic SVG validation | `pnpm lint:svg:icons` | generic SVG files changed |
| Business SVG validation | `pnpm lint:svg:business` | business SVG files changed |
| Illustration SVG validation | `pnpm lint:svg:illustration` | illustration SVG files changed |
| All SVG validation | `pnpm lint:svg` | multiple asset families changed |
| Generic JSON schema | `pnpm lint:json:icons` | `icons/*.json` changed |
| Category JSON schema | `pnpm lint:json:categories` | `categories/*.json` changed |
| Asset metadata schema | `pnpm lint:json:assets` | business or illustration metadata changed |
| All JSON validation | `pnpm lint:json` | mixed JSON changed |
| Formatting check | `pnpm lint:format` | broad file edits or pre-commit cleanup |
| Formatting fix | `pnpm format` | user asks to fix formatting warnings |
| Full lint | `pnpm lint` | broad code, metadata, or workflow changes |
| Diff whitespace check | `git diff --check` | before every commit |

## Local package and docs build

| Capability | Command | Use when |
| --- | --- | --- |
| All packages build | `pnpm build` | generator/runtime changes affect multiple packages |
| All package tests | `pnpm test` | broad package behavior changed |
| Core package | `pnpm --filter @ycloud-web/icons build` / `test` | generic icon package output changed |
| React package | `pnpm --filter @ycloud-web/icons-react build` / `test` | React output or examples changed |
| Vue package | `pnpm --filter @ycloud-web/icons-vue build` / `test` | Vue output or docs imports changed |
| Angular package | `pnpm --filter @ycloud-web/icons-angular build` / `test` | Angular exports changed |
| React Native package | `pnpm --filter @ycloud-web/icons-react-native build` / `test` | RN exports changed |
| Preact package | `pnpm --filter @ycloud-web/icons-preact build` / `test` | Preact exports changed |
| Solid package | `pnpm --filter @ycloud-web/icons-solid build` / `test` | Solid exports changed |
| Astro package | `pnpm --filter @ycloud-web/icons-astro build` / `test` | Astro exports changed |
| Svelte package | `pnpm --filter @ycloud-web/icons-svelte build` / `test` | Svelte exports changed |
| Static package | `pnpm --filter @ycloud-web/icons-static build` / `test` | SVG/static/font artifacts changed |
| Docs dev | `pnpm docs:dev:no-og` | user wants local visual inspection |
| Docs build | `pnpm docs:build:no-og` | docs/search/detail/generated data changed |
| GitHub Pages build | `pnpm docs:build:github-pages` | reproducing production docs build |
| Font build | `pnpm build:font` / `pnpm test:font` | icon font output changed |

## GitHub Actions workflows

| Workflow | Remote capability | Use when |
| --- | --- | --- |
| `lint-code.yml` | PR code, format, and repository linting | PR has general lint failures |
| `lint-pr-title.yml` | semantic PR title validation with required scope | PR title check fails |
| `linting-icons.yml` | source icon linting | SVG/metadata PR checks fail |
| `fix-icon-source.yml` | automatic source icon fixing/renaming/metadata repair | source PR needs AI or scripted repair |
| `pull-request-metadata-suggestions.yml` | metadata suggestion comments | PR needs metadata suggestions |
| `pull-request-icon-preview.yml` | PR icon preview artifacts/comments | user asks to inspect PR visual preview |
| `comment-icon-preview.yml` | icon preview comment update | preview comment is missing or stale |
| `auto-merge-icon-source.yml` | same-repo icon source PR auto-merge | source PR should auto-merge after checks |
| `ci.yml` | release orchestration after icon source merge or manual dispatch | user asks to trigger the stable release path |
| `release.yml` | npm package publishing and GitHub Release creation | publishing failed or needs manual recovery |
| `docs.yml` | GitHub Pages docs build and deploy | docs deployment failed or must be manually triggered |
| `icons.yml` | core `@ycloud-web/icons` checks | core package CI failed |
| `icons-frameworks.yml` | framework package umbrella checks | multiple framework outputs changed |
| `icons-react.yml` | React package checks | React package CI failed |
| `icons-vue.yml` | Vue package checks | Vue package CI failed |
| `icons-angular.yml` | Angular package checks | Angular package CI failed |
| `icons-astro.yml` | Astro package checks | Astro package CI failed |
| `icons-data.yml` | data package checks | icons-data CI failed |
| `icons-preact.yml` | Preact package checks | Preact package CI failed |
| `icons-react-native.yml` | React Native package checks | RN package CI failed |
| `icons-shared.yml` | shared package checks | shared runtime/helpers changed |
| `icons-solid.yml` | Solid package checks | Solid package CI failed |
| `icons-static.yml` | static package checks | static assets, sprite, font, or manifests changed |
| `icons-svelte.yml` | Svelte package checks | Svelte package CI failed |
| `ycloud-font.yml` | icon font checks | font generation failed |
| `labeler.yml` | PR labels | labels are missing or incorrect |
| `request-review.yml` | review routing | reviewer request behavior failed |
| `close-stale-prs.yml` | stale cleanup | stale automation needs inspection |
| `close-issue-with-banned-phrases.yml` | closes unsupported brand icon requests | issue automation needs inspection |

## Remote operation commands

Use `gh` for remote checks and workflow control:

```sh
gh pr view <number> --repo TianJianJun0727/ycloud-icons --json title,state,checks,files,mergeStateStatus
gh run view <run-id> --repo TianJianJun0727/ycloud-icons --log-failed
gh workflow run <workflow.yml> --repo TianJianJun0727/ycloud-icons --ref <ref>
gh run watch <run-id> --repo TianJianJun0727/ycloud-icons --exit-status
```

Do not trigger remote workflows, enable auto-merge, edit releases, publish packages, or deploy docs unless the user explicitly asks for that external action.
