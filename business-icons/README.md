# Business icons

`business-icons/` stores product-, channel-, and workflow-specific SVG icons that do not belong in the generic 24px linear icon family.

For the user-facing guide, see [Business icons](../docs/en/guide/business-icons.md) or [业务图标](../docs/guide/business-icons.md).

## Source layout

```text
business-icons/<color-mode>/<kebab-name>.svg
business-icons/<color-mode>/<kebab-name>.json
business-icons/<color-mode>/index.json
business-icons/index.json
business-icons/metadata/index.json
```

Supported color modes are:

- `outlined`: use `currentColor` and preserve source stroke width unless a component prop overrides it
- `filled`: use the configurable primary business color and keep white details fixed
- `multicolor`: preserve fixed source colors

SVG names must be globally unique across all color modes because generated package exports are flat. File names use lowercase kebab-case, for example `whatsapp-outlined.svg`.

Each SVG requires same-name bilingual metadata JSON. Do not hand-edit the generated root index or metadata index.

## Generate and validate

From the repository root, run:

```sh
pnpm optimize:business
pnpm generate:business-index
pnpm generate:asset-metadata
pnpm lint:svg:business
pnpm lint:json:assets
```

Skip `pnpm optimize:business` for metadata-only changes.

## Package usage

```tsx
import { WhatsappOutlined } from '@ycloud-web/icons-react/business';
```

```ts
import { getBusinessIcon } from '@ycloud-web/icons-data/business';

const whatsapp = getBusinessIcon('whatsapp-outlined');
```

```ts
import whatsappUrl from '@ycloud-web/icons-static/business-icons/outlined/whatsapp-outlined.svg';
```

Generic icons, business icons, and illustrations use separate source rules. If an asset can express an ordinary UI action without product-specific meaning, prefer `icons/`. Use `illustration-icons/` for page-level artwork.
