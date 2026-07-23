# Asset workflows

## Generic icons

Use `icons/<kebab-name>.svg` and `icons/<kebab-name>.json` as one entity.

For additions or SVG replacements:

1. Compare the asset with nearby 24px generic icons.
2. Run `pnpm optimize` for raw design-tool exports.
3. Add or update matching metadata.
4. Run:

```sh
pnpm checkIcons
pnpm lint:svg:icons
pnpm lint:json
```

Generic metadata follows `icon.schema.json`:

- top-level `name`, `tags`, and `use-cases` are Simplified Chinese
- `i18n.en` contains English `name`, `tags`, and `use-cases`
- `categories` uses values allowed by the current schema
- `aliases` uses objects and follows deprecation fields in the schema

For deletion or rename, update both `.svg` and `.json`, then search references:

```sh
rg -n -- '<old-name>|<new-name>' icons categories docs packages
```

Do not add a category merely because a tag is missing. Add `categories/<slug>.json` only when the user explicitly needs a new navigation category and update the schema if required by the repository design.

## Business icons

Use only the color modes accepted by `scripts/writeBusinessIconIndex.mts` and `scripts/checkBusinessSvgSource.mts`. The current modes are:

- `outlined`: strokes/fills use `currentColor` or `none`
- `filled`: configurable primary color with fixed white details
- `multicolor`: fixed colors are preserved

Business filenames are lowercase `kebab-case`, not snake_case. Each SVG has a sibling JSON file:

```text
business-icons/<mode>/<kebab-name>.svg
business-icons/<mode>/<kebab-name>.json
```

Names must be unique across all modes because generated component names do not include the directory name automatically.

For new or changed business assets:

```sh
pnpm optimize:business
pnpm generate:business-index
pnpm generate:asset-metadata
pnpm lint:svg:business
pnpm lint:json:assets
```

Skip `pnpm optimize:business` for metadata-only changes. Never hand-edit `business-icons/index.json` or `business-icons/metadata/index.json`.

Use `asset-metadata.schema.json` and nearby reviewed files when editing sibling JSON. Preserve meaningful user-written metadata; the generator supplies fallbacks but does not replace semantic review.

## Illustrations

Illustrations must live one category level deep. Use the existing category directories, and use `other` when the category is unclear:

```text
illustration-icons/<category>/<kebab-name>.svg
illustration-icons/<category>/<kebab-name>.json
```

Illustration filenames and category directories use lowercase kebab-case. Illustration names must be globally unique across categories.

Preserve fixed colors, gradients, dimensions, and visual hierarchy. Do not run the generic or business color optimizer on illustrations.

For new or changed illustrations:

```sh
pnpm generate:illustration-index
pnpm generate:asset-metadata
pnpm lint:svg:illustration
pnpm lint:json:assets
```

Never hand-edit `illustration-icons/index.json` or `illustration-icons/metadata/index.json`.

## Placement review

Judge placement in this order:

1. Search generic icons for the same common UI meaning.
2. Check whether the candidate uses the generic 24px visual language and customizable color/stroke behavior.
3. If it encodes a product, channel, legacy asset, fixed palette, or business-only object, place it under business icons.
4. If it is large state artwork, place it under illustrations.

Return the decision first, then the repository evidence and nearest alternative. Do not equate an SVG being technically valid with it belonging in the generic family.
