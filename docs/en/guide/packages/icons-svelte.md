# YCloud Icons Svelte

YCloud Icons for Svelte provides reactive Svelte components for rendering optimized inline SVG icons.

**You can use it to:**

- Bind icon props to reactive state and stores.
- Use TypeScript definitions for typed icon names and props.
- Import only the icons you use.

## Installation

::: code-group

```sh [pnpm]
pnpm add @ycloud-web/icons-svelte@latest
```

```sh [npm]
npm install @ycloud-web/icons-svelte@latest
```

```sh [yarn]
yarn add @ycloud-web/icons-svelte@latest
```

```sh [bun]
bun add @ycloud-web/icons-svelte@latest
```

:::

## Version Requirements

Svelte `^5`.

## Usage

```svelte
<script>
  import { House } from '@ycloud-web/icons-svelte';
</script>

<House size={32} color="#ff5a5f" />
```

## Documentation

Read the full guide: [YCloud Icons Svelte](/en/guide/svelte/).

## License

YCloud Icons is released under the ISC License. It is based on [Lucide](https://github.com/lucide-icons/lucide) and keeps the required upstream license and third-party notices.
