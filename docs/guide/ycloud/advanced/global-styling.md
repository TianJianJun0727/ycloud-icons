---
title: Global styling - YCloud
description: Learn how to apply global styles to YCloud icons in your Vanilla JavaScript applications using CSS or the attrs option in createIcons.
---

<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/Sandpack.vue';
</script>

## Global styling

Adjusting icons can be done by using [color](../basics/color.md), [size](../basics/sizing.md) and [stroke width](../basics/stroke-width.md).
To style all icons globally, you can either use CSS, or use the `attrs` option in `createIcons`.

We recommend using CSS for global styling, as it is the most straightforward way to achieve this.

<!-- Local overwrite NOT working -->
<!-- But using CSS prevents you from using props like `size`, `color` and `strokeWidth` on individual icons, since CSS specificity will override these props, to be able to use the props on individual ones you need to adjust the global styles using `attrs` in `createIcons`. -->

This will apply the `color`, `size` and `strokeWidth` props to all icons.

### Style by using attrs on `createIcons`

You can also apply global styles by passing attributes to the `createIcons` function.

::: sandpack {template=vanilla showTabs=false editorHeight=295 editorWidthPercentage=60 dependencies="ycloud"}

```html /index.html [active]
<!doctype html>
<html>
  <body>
    <i data-ycloud="building"></i>

    <script src="index.js"></script>
  </body>
</html>
```

```js /index.js
import './styles.css';

import { createIcons, Building } from 'ycloud/dist/cjs/ycloud';

createIcons({
  attrs: {
    'stroke-width': 1,
    stroke: 'lightblue',
  },
  icons: {
    Building,
  },
});
```

:::

### Style by using CSS

Styling icons is easy to accomplish using CSS.

Every icon has a class attribute applied called `ycloud`. This class name can be used in the CSS file to target all icons that are being used within the app.

- The **color** of the icons can be changed using the [`color`](https://developer.mozilla.org/en-US/docs/Web/CSS/color) CSS property.
- The **size** of the icons can be changed using [`width`](https://developer.mozilla.org/en-US/docs/Web/CSS/width) and [`height`](https://developer.mozilla.org/en-US/docs/Web/CSS/height) CSS properties.
- The **stroke width** of the icons can be changed using the [`stroke-width`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-width) CSS property.

::: sandpack {template=vanilla showTabs=false editorHeight=295 editorWidthPercentage=60 dependencies="ycloud"}

```css icon.css [active]
.ycloud {
  /* Change this! */
  color: #ffadff;
  width: 48px;
  height: 48px;
  stroke-width: 1px;
}

.app {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 6px;
}
```

```html /index.html
<!doctype html>
<html>
  <body>
    <div class="app">
      <i data-ycloud="cake-slice"></i>
      <i data-ycloud="candy"></i>
      <i data-ycloud="apple"></i>
      <i data-ycloud="cookie"></i>
      <i data-ycloud="martini"></i>
      <i data-ycloud="ice-cream-2"></i>
      <i data-ycloud="sandwich"></i>
      <i data-ycloud="wine"></i>
      <i data-ycloud="dessert"></i>
    </div>

    <script src="index.js"></script>
  </body>
</html>
```

```js /index.js
import './styles.css';
import './icon.css';

import {
  createIcons,
  CakeSlice,
  Candy,
  Apple,
  Cookie,
  Martini,
  IceCream2,
  Sandwich,
  Wine,
  Dessert,
} from 'ycloud/dist/cjs/ycloud';

createIcons({
  icons: {
    CakeSlice,
    Candy,
    Apple,
    Cookie,
    Martini,
    IceCream2,
    Sandwich,
    Wine,
    Dessert,
  },
});
```

:::
