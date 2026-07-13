---
name: ycloud-icons-selection
description: Use during YCloud application development when choosing existing generic icons, business icons, or illustrations from this repository for UI code. Provides metadata-based search, use-case matching, and versioned caching for icon recommendations.
---

# YCloud Icons Selection

Use this skill when implementing UI code and choosing visuals from this repository for a page, component, feature, empty state, or documentation example. Trigger it whether or not a design file exists.

## Trigger When

Use this skill when the user asks or the implementation needs:

- “这个按钮/菜单/页面用什么图标”
- “查一下有没有某个图标”
- “把设计稿里的 icon 落到代码里”
- “没有设计稿，帮我选合适的 icon”
- “这个业务场景有没有已有图标或插画”
- migrating from another icon library to YCloud icons
- adding an icon to code and the exact component name is unknown

When a design file already contains an icon, use the design as the visual and semantic constraint, then search the YCloud icon library for the closest existing component. Do not silently keep ad hoc SVG from the design unless no existing asset is suitable or the user explicitly asks to import the raw SVG.

Do not use this skill for SVG source cleanup, package generation, release, or docs deployment. Use `icon-maintenance` for those repository maintenance tasks.

## Decision Rule

Prefer resources in this order:

1. `icons`: default for ordinary UI controls, actions, navigation, status, menus, forms, and toolbars.
2. `business-icons`: fallback for legacy 24x24 visuals, fixed-color assets, duotone or multicolor business objects, and compatibility needs.
3. `illustration-icons`: page-level artwork for empty states, error pages, onboarding, no permission, network disconnected, loading failure, or large placeholders.

Do not use business icons when a generic icon clearly expresses the same meaning. Do not use illustrations as small button/menu icons.

## Search

Run the bundled script from the repository root. Search with Chinese, English, product terms, or scenario descriptions:

```sh
node agents/skills/icon-selection/scripts/search-icons.mjs --query "搜索 客户" --limit 8 --cache-info
```

Useful options:

- `--kind icon`
- `--kind business`
- `--kind illustration`
- `--kind all`
- `--json`
- `--refresh-cache`
- `--no-cache`

The script searches Chinese and English names, tags, use cases, categories, aliases where present, component names, and file names.

Good queries describe intent, not just nouns:

```sh
node agents/skills/icon-selection/scripts/search-icons.mjs --query "客户搜索 输入框" --kind icon --limit 8
node agents/skills/icon-selection/scripts/search-icons.mjs --query "账号未绑定 空状态" --kind illustration --limit 6
node agents/skills/icon-selection/scripts/search-icons.mjs --query "whatsapp 渠道" --kind business --limit 6
```

## Versioned Cache

The script caches normalized search data in `~/.cache/ycloud-icons-design`:

- Local source version: current git `HEAD` plus dirty status under `icons/`, `business-icons/`, `illustration-icons/`, `categories/`, and `docs/public/metadata/`.
- Remote source version: deployed `metadata/version.json` when available, otherwise metadata response headers.
- Use `--cache-info` to inspect hit/miss.
- Use `--refresh-cache` after running docs metadata generation or after a docs deployment.

## Data Sources

The preferred local metadata snapshots are:

- `docs/public/metadata/icons.json`
- `docs/public/metadata/business-icons.json`
- `docs/public/metadata/illustration-icons.json`

If snapshots are missing, the script falls back to source files and deployed metadata.

## Development Usage

For React:

- Generic icon: `import { SearchIcon } from '@ycloud-web/icons-react';`
- Business icon: `import { WhatsappIcon } from '@ycloud-web/icons-react/business';`
- Illustration: `import { AccountUnboundIllustration } from '@ycloud-web/icons-react/illustration';`

When coding, keep the selected asset aligned with its intended level:

- button/icon button/menu item: generic icon
- product/channel/legacy visual: business icon
- page empty/error/no-permission state: illustration

## Recommendation Format

Answer with:

- recommended component name
- import path
- source asset path
- reason it fits the UI context
- why the other resource types are not preferred
- styling limits

Example:

```text
推荐：SearchIcon from @ycloud-web/icons-react
原因：这是普通搜索操作，应优先使用符合规范的通用线性图标。
不使用 business-icons：没有历史兼容或固定色诉求。
不使用 illustration-icons：不是页面级状态插画。
```

## Capability Notes

- Generic icons support size, color, and stroke width.
- Business mono icons support size and color; stroke width can be passed when the SVG contains strokes, with no default stroke width override.
- Business duotone icons support size and primary color; the white secondary layer is fixed.
- Business multicolor icons keep fixed colors and support size only.
- Illustrations support `width` and `height`; default component sizing is `width="100%"` and `height="auto"`.
