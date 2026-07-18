---
title: Optimizations - React Native
description: Optimize React Native and Expo web bundle size by importing individual icons directly.
---

# Optimizations

By default, icons can be imported from the `@ycloud-web/icons-react-native` entry point:

```jsx
import { Camera } from '@ycloud-web/icons-react-native';
```

This relies on the bundler to tree-shake the entry point so that only the icons you use are included in the final bundle. This usually works well on native platforms, but Metro may not fully tree-shake barrel exports when producing an Expo web build, potentially bundling unused icons.

## Metro tree-shaking limitations

When you run `expo export --platform web`, Metro bundles the JavaScript application. An import from the package entry point may associate a single icon with the full icon barrel:

```jsx
// May include unused icons in an Expo web build
import { Camera } from '@ycloud-web/icons-react-native';
```

Expo provides experimental optimizations for [React Native web imports](https://docs.expo.dev/guides/tree-shaking/#react-native-web-imports) and for [removing unused imports and exports](https://docs.expo.dev/guides/tree-shaking/#remove-unused-imports-and-exports). Whether unused icons are fully removed from a barrel import still depends on the current Metro and Expo configuration.

## Recommended: import icons individually

To ensure that the bundle includes only the icons you use, import each icon directly from its own module:

```jsx
import Camera from '@ycloud-web/icons-react-native/icons/camera';

const App = () => {
  return <Camera />;
};

export default App;
```

Each icon has its own module, so the bundler does not need to remove the rest of the icon set from a barrel file. Individual imports work on both native and web platforms.

The module name is the kebab-case form of the icon name. For example, import `ArrowRight` from:

```jsx
import ArrowRight from '@ycloud-web/icons-react-native/icons/arrow-right';
```

::: tip
If an application targets both native platforms and Expo web, use individual imports consistently for more predictable bundle sizes.
:::
