---
name: ycloud-icons-selection
description: Search and recommend existing generic icons, business icons, or illustrations from ycloud-icons for application UI, design-to-code work, icon-library migrations, menus, buttons, empty states, and documentation examples. Use when the desired YCloud component name or import path is unknown; do not use for SVG cleanup, metadata maintenance, package generation, release, or deployment.
---

# YCloud Icons Selection

Choose existing assets from the repository; do not modify source assets unless the user separately requests maintenance.

## Search by meaning and shape

Run from the repository root:

```sh
node agents/skills/icon-selection/scripts/search-icons.mjs --query "客户搜索 输入框" --limit 8 --cache-info
```

Use `--kind icon`, `--kind business`, or `--kind illustration` to narrow results. Use `--json` for machine-readable output, `--refresh-cache` after metadata regeneration or deployment, and `--no-cache` while diagnosing source data.

For a design icon, search at least once by semantic intent and once by visible shape when the first result is ambiguous. For library migrations, search both the old component name and the control's actual meaning.

## Choose the asset family

1. Prefer `icons` for ordinary controls, actions, navigation, status, forms, menus, and toolbars.
2. Use `business-icons` for YCloud/product/channel-specific visuals, legacy compatibility, or fixed business color behavior.
3. Use `illustration-icons` for page-level empty, error, permission, onboarding, disconnected, or large placeholder artwork.

Do not use a business icon when a generic icon clearly communicates the same action. Do not use an illustration inside a small control.

## Verify before coding

- Confirm the component name and import path in search output or generated package exports.
- Open the source SVG when visual similarity matters.
- Check surrounding label, control type, size, and color requirements.
- Report the tradeoff before substituting an asset that is semantically correct but visibly different.
- Do not silently retain ad hoc design SVGs when a suitable existing asset is available.

## Apply in code

For React, use the import path returned by the search script:

```tsx
import { SearchIcon } from '@ycloud-web/icons-react';
import { Whatsapp } from '@ycloud-web/icons-react/business';
import { AccountUnbound } from '@ycloud-web/icons-react/illustration';
```

Switch the package family for Vue, Svelte, Solid, Preact, or another supported framework while retaining the verified exported component name.

Respect capability differences:

- generic icons: size, color, and stroke width
- outlined business icons: size, color, and stroke width when strokes exist
- filled business icons: size, color, and stroke width when strokes exist; white details stay fixed
- multicolor business icons: fixed colors and size
- illustrations: width and height; use meaningful alternative text when informative

## Return a decision

Lead with one recommended component, import path, source path, fit rationale, styling limits, and confidence (`high`, `medium`, or `low`). Explain briefly why other asset families are less suitable.

When confidence is not high, provide two or three ranked candidates instead of forcing a single choice.
