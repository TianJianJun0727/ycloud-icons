---
name: ycloud-icons-maintenance
description: Maintain the ycloud-icons repository when adding, deleting, renaming, cleaning, or migrating generic icons, business icons, and illustrations; editing bilingual metadata or categories; regenerating indexes and framework packages; diagnosing icon CI, docs, changelog, release, or npm publishing failures. Use for repository changes and placement reviews, not for merely choosing an existing asset for application UI code.
---

# YCloud Icons Maintenance

Operate from the repository root. Preserve unrelated working-tree changes and keep every edit traceable to the requested icon, metadata, build, or release task.

## Start with evidence

1. Run `git status --short` and inspect only the paths relevant to the request.
2. Classify the asset before editing:
   - generic icon: reusable UI action, status, navigation, form, or toolbar symbol
   - business icon: YCloud/product/channel-specific or compatibility visual
   - illustration: large page-level artwork or state visual
3. Inspect the nearest existing assets and the repository validators. Do not infer naming, color, or metadata rules from memory.
4. For placement-only reviews, return a direct `能放 / 不能放` judgment, cite the closest repository alternative, and do not edit files.

Use `ycloud-icons-selection` when the task only needs an existing asset recommendation for application code.

## Route the task

| Task            | Source of truth                                                  | Required generation or validation                                                                                         |
| --------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Generic icon    | `icons/<kebab-name>.svg` + matching JSON                         | `pnpm checkIcons`, `pnpm lint:json`, `pnpm lint:svg:icons`                                                                |
| Business icon   | `business-icons/<mode>/<kebab-name>.svg` + matching JSON         | `pnpm generate:business-index`, `pnpm generate:asset-metadata`, `pnpm lint:svg:business`, `pnpm lint:json:assets`         |
| Illustration    | `illustration-icons/<category>/<kebab-name>.svg` + matching JSON | `pnpm generate:illustration-index`, `pnpm generate:asset-metadata`, `pnpm lint:svg:illustration`, `pnpm lint:json:assets` |
| Docs/search     | generated metadata and VitePress data                            | `pnpm docs:build:no-og`                                                                                                   |
| Package exports | generator plus affected package                                  | affected package `build:icons`, `test`, or `build`                                                                        |
| Release/CI      | workflows, release JSON, changelog, tags                         | inspect failed run and verify the narrowest affected chain                                                                |

Read [asset-workflows.md](references/asset-workflows.md) before modifying source assets, metadata, categories, or generated indexes.

Read [capability-map.md](references/capability-map.md) when selecting which local script, package command, or GitHub Action workflow matches the requested maintenance task.

Read [docs-and-release.md](references/docs-and-release.md) only for docs, package generation, CI, changelog, release, tag, npm publishing, deployment work, or requests for a stable release path.

## Make surgical changes

- Keep generic SVG and JSON files paired. Rename or delete both together.
- Keep business and illustration SVGs paired with sibling JSON metadata.
- Use Simplified Chinese in top-level metadata and English in `i18n.en`.
- Reuse existing generic categories and existing business color modes unless the user explicitly requests a new one.
- Do not change SVG geometry while fixing metadata.
- Do not hand-edit generated root indexes or metadata indexes; run their generators.
- Do not regenerate every framework package unless the task affects their generator or exports.
- When generators produce a broad diff, separate expected generated changes from unrelated pre-existing changes before staging.

## Verify proportionally

Run the task-specific checks from the routing table, then:

```sh
git diff --check
git status --short
```

Add `pnpm docs:build:no-og` when the change must appear in docs, search, metadata snapshots, or detail pages. Add an affected package build only when imports or generated package outputs changed.

Report:

- files and asset families changed
- generated files refreshed
- exact checks run and their results
- checks skipped and why
- any unrelated working-tree changes left untouched
