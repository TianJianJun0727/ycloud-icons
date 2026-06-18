---
title: Getting started - YCloud
description: This guide will help you get started with YCloud in your Vanilla JavaScript project.
---

<script setup>
import OverviewLink from '../../.vitepress/theme/components/base/OverviewLink.vue'
import OverviewLinkGrid from '../../.vitepress/theme/components/base/OverviewLinkGrid.vue'
import { reactSidebar } from '../../.vitepress/sidebar/react'
</script>

# Getting started

This guide will help you get started with YCloud in your Vanilla JavaScript project.
Make sure you have a your environment set up. If you don't have one yet, you can create a new project using Vite, Parcel or any other boilerplate of your choice.

## Installation

### Package Managers

::: code-group

```sh [pnpm]
pnpm add ycloud
```

```sh [yarn]
yarn add ycloud
```

```sh [npm]
npm install ycloud
```

```sh [bun]
bun add ycloud
```

:::

### CDN

```html
<!-- Development version -->
<script src="https://unpkg.com/ycloud@latest/dist/umd/ycloud.js"></script>

<!-- Production version -->
<script src="https://unpkg.com/ycloud@latest"></script>
```

We strongly suggest you anchor to a specific version, such as `https://unpkg.com/ycloud@x.xxx.x/dist/umd/ycloud.min.js`, rather than using `@latest`. This is because the latest version may introduce breaking changes that could potentially break your application. By anchoring to a specific version, you can ensure that your application remains stable and functional, even if there are updates to the library in the future.

## Importing your first icon

YCloud is built with ES Modules, so it's completely tree-shakable.

The `createIcons` function will search for HTMLElements with the attribute `data-ycloud` and replace it with the svg from the given icon name.

### Example

```html
<!-- Your HTML file -->
<i data-ycloud="menu"></i>
```

```js
import { createIcons, icons } from 'ycloud';

// Caution, this will import all the icons and bundle them.
createIcons({ icons });

// Recommended way, to include only the icons you need.
import { createIcons, Menu, ArrowRight, Globe } from 'ycloud';

createIcons({
  icons: {
    Menu,
    ArrowRight,
    Globe,
  },
});
```

## Advanced Usage

### Additional Options

In the `createIcons` function you can pass some extra parameters:

- you can pass `nameAttr` to adjust the attribute name to replace icons (default is `data-ycloud`).
- you can pass `attrs` to pass additional custom attributes, for instance CSS classes or stroke options.
- you can pass `root` to provide a custom DOM element the icons should be replaced in (useful when manipulating small sections of a large DOM or elements in the shadow DOM)
- you can pass `inTemplates: true` to also replace icons inside `<template>` tags.

Here is a full example:

```js
import { createIcons } from 'ycloud';

createIcons({
  attrs: {
    class: ['my-custom-class', 'icon'],
    'stroke-width': 1,
    stroke: '#333',
  },
  nameAttr: 'data-ycloud', // attribute for the icon name.
  root: element, // DOM element to replace icons in.
  inTemplates: true, // Also replace icons inside <template> tags.
});
```

### Example using a CDN

```html
<!doctype html>
<body>
  <i
    data-ycloud="volume-2"
    class="my-class"
  ></i>
  <i data-ycloud="x"></i>
  <i data-ycloud="menu"></i>

  <script src="https://unpkg.com/ycloud@latest"></script>
  <script>
    ycloud.createIcons();
  </script>
</body>
```
