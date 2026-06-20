---
title: Getting started - React Native
description: This guide will help you get started with YCloud in your React Native project.
---

<script setup>
import OverviewLink from '../../.vitepress/theme/components/base/OverviewLink.vue'
import OverviewLinkGrid from '../../.vitepress/theme/components/base/OverviewLinkGrid.vue'
import { reactNativeSidebar } from '../../.vitepress/sidebar/react-native'
</script>

# Getting started

This guide will help you get started with YCloud in your React Native project.
Make sure you have a React Native environment set up. If you don't have one yet, you can create a new React Native project using React Native CLI, Expo, or any other React Native boilerplate of your choice.

## Installation

First, ensure that you have `react-native-svg` (version between 12 and 15) installed. Then, install the package:

::: code-group

```sh [pnpm]
pnpm add @ycloud-web/icons-react-native
```

```sh [yarn]
yarn add @ycloud-web/icons-react-native
```

```sh [npm]
npm install @ycloud-web/icons-react-native
```

```sh [bun]
bun add @ycloud-web/icons-react-native
```

:::

## Importing your first icon

YCloud is built with ES Modules.

Each icon can be imported as a React component, which renders an `react-native-svg` element.

```jsx
import { Camera } from '@ycloud-web/icons-react-native';

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
  <OverviewLink v-for="item in reactNativeSidebar[1].items" :key="item.link" :href="item.link" :title="item.text" :desc="item.desc"/>
</OverviewLinkGrid>
