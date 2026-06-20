---
title: Stroke width - YCloud
description: Learn how to customize the stroke width of YCloud icons in your Vanilla JavaScript applications using the strokeWidth and absoluteStrokeWidth attributes.
---

<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/Sandpack.vue'
</script>

# Stroke width

All icons are designed with SVG elements using strokes.
These have a default stroke width of `2px`.

The `strokeWidth` can be adjusted to create a different look of the icons.

## Adjusting stroke width with `strokeWidth` prop

::: sandpack {template=vanilla showTabs=false editorHeight=250 editorWidthPercentage=70 dependencies="ycloud"}

```html /index.html [active]
<!doctype html>
<html>
  <body>
    <i
      data-ycloud="folder-lock"
      stroke-width="1"
    ></i>

    <script src="index.js"></script>
  </body>
</html>
```

```js /index.js
import './styles.css';

import { createIcons, FolderLock } from 'ycloud/dist/cjs/ycloud';

createIcons({
  icons: {
    FolderLock,
  },
});
```

:::

<!-- ## Absolute stroke width

When adjusting the `size` prop the size of the stroke width will be relative to the size of the icon, this is the default SVG behavior. The `absoluteStrokeWidth` prop is introduced to adjust this behavior to make the stroke width constant no matter the size of the icon.

This means that when `absoluteStrokeWidth` is enabled and the `size` of the icons is set to `48px` the `strokeWidth` will still be `2px` on the screen.

Note `2px` is the default stroke width for a YCloud icon, this can be adjusted to all sizes.

![Absolute stroke width comparison](../../../../images/absolute-stroke-width-compare.png?raw=true "Absolute stroke width comparison")

### Adjusting stroke width with `absoluteStrokeWidth` prop

Setting `absoluteStrokeWidth` to `true` will make the stroke width absolute.

::: sandpack {template=vanilla showTabs=false editorHeight=250 editorWidthPercentage=70 dependencies="ycloud"}

```html /index.html [active]
<!DOCTYPE html>
<html>
  <body>
    <i data-ycloud="roller-coaster" stroke-width="96" absolute-stroke-width="true"></i>

    <script src="index.js"></script>
  </body>
</html>
```

```js /index.js
import "./styles.css";

import { createIcons, RollerCoaster } from 'ycloud/dist/cjs/ycloud';

createIcons({
  icons: {
    RollerCoaster,
  }
});

```

::: -->
