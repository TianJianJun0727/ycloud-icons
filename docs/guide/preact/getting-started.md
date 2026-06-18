---
title: Getting started - Preact
description: This guide will help you get started with YCloud in your Preact project.
---

<script setup lang="ts">
import OverviewLink from '../../.vitepress/theme/components/base/OverviewLink.vue'
import OverviewLinkGrid from '../../.vitepress/theme/components/base/OverviewLinkGrid.vue'
import { preactSidebar } from '../../.vitepress/sidebar/preact'
</script>

# Getting started

This guide will help you get started with YCloud in your Preact project.
Make sure you have a Preact environment set up. If you don't have one yet, you can create a new Preact project using Create Preact App, Vite, or any other Preact boilerplate of your choice.

## Installation

::: code-group

```sh [pnpm]
pnpm add @ycloud-web/icons-preact
```

```sh [yarn]
yarn add @ycloud-web/icons-preact
```

```sh [npm]
npm install @ycloud-web/icons-preact
```

```sh [bun]
bun add @ycloud-web/icons-preact
```

:::

## Importing your first icon

YCloud is built with ES Modules, so it's completely tree-shakable.

Each icon can be imported as a Preact component, which renders an inline SVG element. This way, only the icons that are imported into your project are included in the final bundle. The rest of the icons are tree-shaken away.

```jsx
import { Camera } from '@ycloud-web/icons-preact';

// Usage
const App = () => {
  return <Camera />;
};

export default App;
```

## Props

To customize the appearance of an icon, you can use the following props:

| name                  | type      | default      |
| --------------------- | --------- | ------------ |
| `size`                | _number_  | 24           |
| `color`               | _string_  | currentColor |
| `strokeWidth`         | _number_  | 2            |
| `absoluteStrokeWidth` | _boolean_ | false        |

Because icons render as SVG elements, all standard SVG attributes can also be applied as props. See the list of SVG Presentation Attributes on [MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/Presentation).

```jsx
// Usage
const App = () => {
  return (
    <Camera
      size={48}
      color="red"
      strokeWidth={1}
    />
  );
};
```

More examples and details how to use props, continue the guide:

<OverviewLinkGrid>
  <OverviewLink v-for="item in preactSidebar[1].items" :key="item.link" :href="item.link" :title="item.text" :desc="item.desc"/>
</OverviewLinkGrid>
