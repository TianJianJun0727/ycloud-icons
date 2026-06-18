---
title: Color - YCloud
description: Learn how to customize the color of YCloud icons in your Vanilla JavaScript applications using the color attribute and CSS.
---

<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/Sandpack.vue'
</script>

# Color

By default, all icons have the color value: `currentColor`. This keyword uses the element's computed text `color` value to represent the icon color.

Read more about [`currentColor` on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#currentcolor_keyword).

## Adjust the color using the `color` attribute

The color can be adjusted by passing the color attribute to the element.

::: sandpack {template=vanilla showTabs=false editorHeight=295 editorWidthPercentage=60 dependencies="ycloud"}

```html /index.html [active]
<!doctype html>
<html>
  <body>
    <i
      data-ycloud="smile"
      color="#3e9392"
    ></i>

    <script src="index.js"></script>
  </body>
</html>
```

```js /index.js
import './styles.css';

import { createIcons, Smile } from 'ycloud/dist/cjs/ycloud';

createIcons({
  icons: {
    Smile,
  },
});
```

:::

## Using parent elements text color value

Because the color of ycloud icons uses `currentColor`, the color of the icon depends on the computed `color` of the element, or it inherits it from its parent.

For example, if a parent element's color value is `#fff` and one of the children is a ycloud icon, the color of the icon will be rendered as `#fff`. This is browser native behavior.

::: sandpack {template=vanilla showTabs=false editorHeight=300 editorWidthPercentage=60 dependencies="ycloud"}

```html /index.html [active]
<!doctype html>
<html>
  <body>
    <button style="color: white">
      <i data-ycloud="thumbs-up"></i>
      Like
    </button>

    <script src="index.js"></script>
  </body>
</html>
```

```js /index.js [hidden]
import './styles.css';

import { createIcons, ThumbsUp } from 'ycloud/dist/cjs/ycloud';

createIcons({
  icons: {
    ThumbsUp,
  },
});
```

:::
