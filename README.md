# YCloud Icons

YCloud Icons is a multi-framework icon toolkit forked from [YCloud](https://github.com/TianJianJun0727/ycloud-icons).

The first phase keeps YCloud's proven SVG source format, generation pipeline, and component API shape, while moving the public packages under the `@ycloud-web` npm scope.

## Packages

| Target          | Package                   | Source                  |
| --------------- | ------------------------- | ----------------------- |
| Core JavaScript | `@ycloud-web/icons`       | `packages/ycloud`       |
| React           | `@ycloud-web/icons-react` | `packages/ycloud-react` |
| Vue             | `@ycloud-web/icons-vue`   | `packages/vue`          |
| Icon data       | `@ycloud-web/icons-data`  | `packages/icons`        |

Other framework packages from the upstream fork remain in the repository and can be renamed after the React/Vue flow is stable.

## Component Names

Component names intentionally keep the upstream style for now:

```tsx
import { Camera } from '@ycloud-web/icons-react';

export function Example() {
  return <Camera size={24} />;
}
```

This keeps strong TypeScript autocomplete, safe refactoring, and tree-shaking behavior.

## Style Strategy

The planned two-style model should be separated by package entrypoints or directories, not by component suffixes:

```tsx
import { Camera } from '@ycloud-web/icons-react/outline';
import { Camera as FilledCamera } from '@ycloud-web/icons-react/filled';
```

The public component name remains stable (`Camera`). The source icon name remains stable (`camera`). The selected entrypoint decides whether the generated SVG is outline or filled.

## Development

```sh
pnpm install
pnpm icons-react build
pnpm icons-vue build
pnpm --filter @ycloud-web/icons-docs docs:dev
```

## License And Attribution

This project is based on YCloud and keeps the upstream ISC license. See [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md) and [LICENSE](./LICENSE).
