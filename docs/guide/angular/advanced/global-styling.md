---
title: Global Styling - Angular
description: Learn how to style all icons globally in your Angular application using CSS or the provideYCloudConfig provider.
---

<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/SandpackAngular.vue'
</script>

# Global Styling

YCloud icons can be customized using the inputs for [color](../basics/color.md), [size](../basics/sizing.md) and [stroke width](../basics/stroke-width.md).

To style all icons globally, you can either use CSS or configure global defaults using `provideYCloudConfig`.

We recommend using CSS for global styling, as it is the most straightforward approach. However, CSS rules may override the `size`, `color`, and `strokeWidth` inputs on individual icons. If you need to keep those inputs configurable per icon, use `provideYCloudConfig` instead.

## Configuring global defaults

YCloud Angular provides the `provideYCloudConfig` provider to set default properties for all icons.

You can define global defaults (such as `size`, `color`, or `strokeWidth`) while still allowing individual icons to override them through inputs.

Register the provider in your application configuration or in a top-level component:

```ts
import { ApplicationConfig } from '@angular/core';
import { provideYCloudConfig } from '@ycloud-web/icons-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideYCloudConfig({
      strokeWidth: 1.5,
    }),
  ],
};
```

## Style by using CSS

Styling icons globally can be done using CSS.

All YCloud icons include the `ycloud` class. You can use this class in your styles to target every icon in your application.

- The **color** of the icons can be changed using the [`color`](https://developer.mozilla.org/en-US/docs/Web/CSS/color) property.
- The **size** of the icons can be changed using [`width`](https://developer.mozilla.org/en-US/docs/Web/CSS/width) and [`height`](https://developer.mozilla.org/en-US/docs/Web/CSS/height).
- The **stroke width** of the icons can be changed using [`stroke-width`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-width).

::: sandpack {template=angular editorHeight=300 dependencies="@ycloud-web/icons-angular"}

```css /src/app/icon.css [active]
.ycloud {
  /* Change this! */
  color: #ffadff;
  width: 56px;
  height: 56px;
  stroke-width: 1px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 6px;
}
```

```ts /src/app/app.component.ts
import { Component, ViewEncapsulation } from '@angular/core';
import {
  YCloudCakeSlice,
  YCloudCandy,
  YCloudApple,
  YCloudCookie,
  YCloudMartini,
  YCloudIceCream2,
  YCloudSandwich,
  YCloudWine,
  YCloudDessert,
} from '@ycloud-web/icons-angular';

@Component({
  selector: 'app',
  imports: [
    YCloudCakeSlice,
    YCloudCandy,
    YCloudApple,
    YCloudCookie,
    YCloudMartini,
    YCloudIceCream2,
    YCloudSandwich,
    YCloudWine,
    YCloudDessert,
  ],
  template: `<div class="grid">
    <svg ycloudCakeSlice />
    <svg ycloudCandy />
    <svg ycloudApple />
    <svg ycloudCookie />
    <svg ycloudMartini />
    <svg ycloudIceCream2 />
    <svg ycloudSandwich />
    <svg ycloudWine />
    <svg ycloudDessert />
  </div>`,
  styleUrls: ['./app.component.css', './icon.css'],
  encapsulation: ViewEncapsulation.None,
})
export class App {}
```

:::

### Absolute stroke width

To keep the stroke width constant regardless of icon size, apply `vector-effect: non-scaling-stroke` to the icon's children. See [absolute-stroke-width](../basics/stroke-width.md#absolute-stroke-width) for more details.

::: sandpack {template=angular editorHeight=300 dependencies="@ycloud-web/icons-angular"}

```css /src/app/icon.css [active]
.ycloud {
  width: 48px;
  height: 48px;
  stroke-width: 1.5;
}

.ycloud * {
  vector-effect: non-scaling-stroke;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 6px;
}
```

```ts /src/app/app.component.ts
import { Component, ViewEncapsulation } from '@angular/core';
import {
  YCloudTentTree,
  YCloudCaravan,
  YCloudFlameKindling,
  YCloudMountainSnow,
  YCloudTrees,
  YCloudAxe,
  YCloudMap,
  YCloudCloudMoon,
  YCloudSparkles,
} from '@ycloud-web/icons-angular';

@Component({
  selector: 'app',
  imports: [
    YCloudTentTree,
    YCloudCaravan,
    YCloudFlameKindling,
    YCloudMountainSnow,
    YCloudTrees,
    YCloudAxe,
    YCloudMap,
    YCloudCloudMoon,
    YCloudSparkles,
  ],
  template: `<div class="grid">
    <svg ycloudTentTree />
    <svg ycloudCaravan />
    <svg ycloudFlameKindling />
    <svg ycloudMountainSnow />
    <svg ycloudTrees />
    <svg ycloudAxe />
    <svg ycloudMap />
    <svg ycloudCloudMoon />
    <svg ycloudSparkles />
  </div>`,
  styleUrls: ['./app.component.css', './icon.css'],
  encapsulation: ViewEncapsulation.None,
})
export class App {}
```

:::
