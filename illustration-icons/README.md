# Illustration icons

`illustration-icons/` stores page-level artwork for empty states, onboarding, errors, permissions, integrations, templates, and other large visual feedback.

For the user-facing guide, see [Illustrations](../docs/en/guide/illustration-icons.md) or [插画](../docs/guide/illustration-icons.md).

## Source layout

```text
illustration-icons/<category>/<kebab-name>.svg
illustration-icons/<category>/<kebab-name>.json
illustration-icons/index.json
illustration-icons/metadata/index.json
```

Use an existing category such as `integration`, `logo`, `template`, `version`, or `other`. Illustration names must be globally unique across categories because generated package exports are flat.

Preserve source colors, gradients, dimensions, and visual hierarchy. Each SVG requires same-name bilingual metadata JSON. Do not run the generic or business color optimizer, and do not hand-edit generated indexes.

## Generate and validate

From the repository root, run:

```sh
pnpm generate:illustration-index
pnpm generate:asset-metadata
pnpm lint:svg:illustration
pnpm lint:json:assets
```

## Package usage

```tsx
import { EmptyPage } from '@ycloud-web/icons-react/illustration';
```

```ts
import { getIllustration } from '@ycloud-web/icons-data/illustration';

const emptyPage = getIllustration('empty-page');
```

```ts
import emptyPageUrl from '@ycloud-web/icons-static/illustration-icons/other/empty-page.svg';
```

Use `icons/` or `business-icons/` instead when the asset is intended for a 24px button, menu, form, or navigation control.
