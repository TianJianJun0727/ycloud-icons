---
title: 快速开始 - YCloud
description: 本指南会帮助你在 Vanilla JavaScript 项目中开始使用 YCloud Icons。
---

<script setup>
import OverviewLink from '../../.vitepress/theme/components/base/OverviewLink.vue'
import OverviewLinkGrid from '../../.vitepress/theme/components/base/OverviewLinkGrid.vue'
import { reactSidebar } from '../../.vitepress/sidebar/react'
</script>

# 快速开始

本指南会帮助你在 Vanilla JavaScript 项目中开始使用 YCloud Icons。
请先确保你已经准备好项目环境。如果还没有，可以使用 Vite、Parcel 或其他你熟悉的脚手架创建一个新项目。

## 安装

### 包管理器

::: code-group

```sh [pnpm]
pnpm add @ycloud-web/icons
```

```sh [yarn]
yarn add @ycloud-web/icons
```

```sh [npm]
npm install @ycloud-web/icons
```

```sh [bun]
bun add @ycloud-web/icons
```

:::

## 导入第一个图标

YCloud Icons 基于 ES Modules 构建，因此可以完整支持 tree-shaking。

`createIcons` 函数会查找带有 `data-ycloud` 属性的 HTMLElement，并用指定图标名称对应的 SVG 替换它。

### 示例

```html
<!-- 你的 HTML 文件 -->
<i data-ycloud="menu"></i>
```

```js
import { createIcons, icons } from '@ycloud-web/icons';

// 注意：这会导入所有图标，并把它们一起打进产物。
createIcons({ icons });

// 推荐方式：只包含实际需要的图标。
import { createIcons, Menu, ArrowRight, Globe } from '@ycloud-web/icons';

createIcons({
  icons: {
    Menu,
    ArrowRight,
    Globe,
  },
});
```

## 进阶用法

### 额外选项

可以向 `createIcons` 函数传入一些额外参数：

- 可以传入 `nameAttr`，用于调整要替换图标的属性名（默认是 `data-ycloud`）。
- 可以传入 `attrs`，用于附加自定义属性，例如 CSS class 或描边选项。
- 可以传入 `root`，用于指定要替换图标的自定义 DOM 元素；在处理大型 DOM 的局部区域或 Shadow DOM 元素时很有用。
- 可以传入 `inTemplates: true`，让 `<template>` 标签内的图标也被替换。

下面是完整示例：

```js
import { createIcons } from '@ycloud-web/icons';

createIcons({
  attrs: {
    class: ['my-custom-class', 'icon'],
    'stroke-width': 1,
    stroke: '#333',
  },
  nameAttr: 'data-ycloud', // 图标名称所在的属性。
  root: element, // 要在其中替换图标的 DOM 元素。
  inTemplates: true, // 同时替换 <template> 标签内的图标。
});
```
