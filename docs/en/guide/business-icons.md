---
title: Business icons
description: Source, validation, and submission rules for business-specific SVG icons.
---

# Business icons

`business-icons/` stores business-specific SVGs that should not enter the generic icon library.

Generic icons live in `icons/` and follow the 24x24 linear `currentColor` rules with `stroke-width="2"` and metadata. Business icons are split by color mode into outlined, filled, and multicolor sources. They use dedicated cleanup and validation rules, and they do not enter the generic category and metadata system.

## When to use it

Use `business-icons/` when an SVG:

- contains product, channel, status, or business-object details
- should be maintained as a business source asset instead of a generic package icon
- needs to preserve its original size, stroke width, line caps, line joins, or geometry

If the artwork can become a generic linear icon, keep it in `icons/`.

## Directory

```text
business-icons/<color-mode>/<icon-name>.svg
business-icons/<color-mode>/<icon-name>.json
business-icons/<color-mode>/index.json
business-icons/index.json
business-icons/metadata/index.json
docs/public/metadata/business-icons.json
```

Business icon first-level folders now represent color modes instead of business categories. Each folder keeps its Chinese and English display title in `business-icons/<color-mode>/index.json`. Every SVG must have a same-name JSON metadata file for search, AI icon selection, and docs. The root `business-icons/index.json` is generated; `business-icons/metadata/index.json` is the latest repository metadata snapshot used directly by the Figma plugin, GitHub checks, and skills lookup. During docs builds, that source snapshot is copied to `docs/public/metadata/business-icons.json` as the deployed URL fallback.

The current allowed folders are:

```text
outlined
filled
multicolor
```

Business icons need same-name per-SVG metadata JSON, but they do not enter the generic category system. They are generated into `business` subpath entries in the existing packages instead of being mixed into the generic default entries. Component exports are generated from the complete SVG file name: `calling-outlined.svg` exports `CallingOutlined`, and `calling-filled.svg` exports `CallingFilled`. The generator does not append the containing folder's color mode, so SVG file names must remain unique across color-mode folders. `business-icons/metadata/index.json` is generated from source metadata and used by the Figma plugin, GitHub checks, and local skills lookup; the docs public snapshot is used after deployment as fallback.

## Cleanup And Validation

Business icons run through a dedicated business SVG cleanup pipeline. It does not reuse the generic 24x24 linear icon normalization rules, and it does not rewrite size, stroke details, or geometry.

Business cleanup will:

- remove `<script>`, `<foreignObject>`, event attributes, and `javascript:` URLs
- remove design-tool noise such as `style`, `class`, unreferenced `id`, and `data-*`
- `outlined`: convert hardcoded `fill` and `stroke` to `currentColor`, or keep `none`
- `filled`: keep white fills/strokes as fixed `#fff` and convert all other colors to `var(--business-icon-primary-color)`, without relying on path order
- `multicolor`: keep fixed colors from the source SVG
- preserve original `width`, `height`, `viewBox`, `stroke-width`, `stroke-linecap`, `stroke-linejoin`, and geometry

Only baseline structure and safety checks run:

- paths must use `business-icons/<color-mode>/<icon-name>.svg`
- same-name metadata must exist at `business-icons/<color-mode>/<icon-name>.json`
- color-mode folders must include `business-icons/<color-mode>/index.json`
- root `business-icons/index.json` must match `node ./scripts/writeBusinessIconIndex.mts`
- `business-icons/metadata/index.json` must match `node ./scripts/writeAssetMetadata.mts`; `docs/public/metadata` is copied during docs builds
- file names must be lowercase kebab-case, for example `whatsapp-outlined.svg`
- the root element must be `<svg>`
- `outlined` `fill` and `stroke` may only be `currentColor` or `none`
- `filled` `fill` and `stroke` may only be `var(--business-icon-primary-color)`, `#fff`, or `none`
- `multicolor` may keep fixed colors, but still runs through the safety checks
- style and design-tool attributes such as `style`, `class`, and `data-*` are not allowed
- `<script>` and `<foreignObject>` are not allowed
- event attributes such as `onclick` are not allowed
- `javascript:` URLs are not allowed

Run locally:

```sh
node ./scripts/optimizeBusinessSvgs.mts
node ./scripts/writeBusinessIconIndex.mts
node ./scripts/writeAssetMetadata.mts
node ./scripts/checkBusinessSvgSource.mts
```

## Figma plugin submission

When “Business icons” is selected in the Figma plugin, the plugin will:

- choose Outlined, Filled, or Multicolor
- submit files to `business-icons/<color-mode>/*.svg`
- submit matching `business-icons/<color-mode>/*.json`
- clean SVGs with the business SVG rules before submission
- skip `icons/*.json` generation
- skip generic multi-category, tag, and use-case requirements
- only block SVGs that fail the business SVG baseline checks

When “Generic icons” is selected, the plugin keeps using the existing `icons/*.svg` + `icons/*.json` flow.

## Usage

For shared usage across projects, keep installing the existing package and import from the `business` subpath.

### Core package

Install this package when you need structured SVG definitions or a shared icon index:

```sh
pnpm add @ycloud-web/icons
```

```ts
import { businessIcons, getBusinessIcon } from '@ycloud-web/icons/business';

const icon = getBusinessIcon('whatsapp-outlined');
const rootAttrs = icon.attrs;
const children = icon.node;
const sameIcon = businessIcons['whatsapp-outlined'];
```

### React package

React projects can use the business entry in the existing React package:

```sh
pnpm add @ycloud-web/icons-react
```

```tsx
import { WhatsappOutlined } from '@ycloud-web/icons-react/business';

export function ChannelIcon() {
  return (
    <WhatsappOutlined
      size={24}
      color="#111827"
      strokeWidth={1.5}
    />
  );
}
```

React business icon components render inline `<svg>`. `outlined` and `filled` support `size`, `color`, and `strokeWidth`. `strokeWidth` is unset by default, so source SVG stroke widths or no-stroke states stay unchanged unless the prop is explicitly passed. White details in `filled` icons stay fixed at `#fff`; there is no second color prop. `multicolor` keeps fixed source colors, does not expose `color` or `strokeWidth`, and only supports size changes.

```tsx
import { ShopifyFilled } from '@ycloud-web/icons-react/business';

export function FilledIcon() {
  return (
    <ShopifyFilled
      size={24}
      color="#111827"
      strokeWidth={1.5}
    />
  );
}
```

Other inline SVG component packages support the same `size`, `color`, and `strokeWidth` rules and use the same `business` subpath pattern. React Native business icons render image resources, so they do not support dynamic `strokeWidth`:

```ts
import { WhatsappOutlined } from '@ycloud-web/icons-preact/business';
import { WhatsappOutlined } from '@ycloud-web/icons-vue/business';
import { WhatsappOutlined } from '@ycloud-web/icons-solid/business';
import { WhatsappOutlined } from '@ycloud-web/icons-svelte/business';
import { WhatsappOutlined } from '@ycloud-web/icons-astro/business';
import { WhatsappOutlined } from '@ycloud-web/icons-react-native/business';
```

The Angular package exports business icon definitions that can be rendered as inline SVG or serialized by your application:

```ts
import { getBusinessIcon } from '@ycloud-web/icons-angular/business';

const whatsapp = getBusinessIcon('whatsapp-outlined');
```

### Static package

Install this package when you need the raw SVG file URL:

```sh
pnpm add @ycloud-web/icons-static
```

```ts
import whatsappIconUrl from '@ycloud-web/icons-static/business-icons/outlined/whatsapp-outlined.svg';
```

Business icons also generate a separate icon font. It is not mixed into the generic `font/ycloud.css` output:

```css
@import '@ycloud-web/icons-static/business-font/ycloud-business.css';
```

```html
<span
  class="business-icon-whatsapp-outlined"
  aria-hidden="true"
></span>
```

Static SVGs and data packages keep the cleaned primary color token and fixed white details. During component package generation, the filled primary token is converted to the framework `color` prop; multicolor icons always keep their fixed source colors.
