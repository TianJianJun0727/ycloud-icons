---
title: Filled Icons - YCloud
description: Learn the difference between applying fill to generic icons and using authored filled business icons in YCloud.
---

<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/Sandpack.vue'
</script>

# Filled Icons

Generic icons from the package's default entrypoint are stroke-based and do not include an automatically generated filled counterpart for every icon. You can still pass standard SVG properties such as `fill`, which works for shapes that support it.

Authored business icons are separate assets. Filled business icons are exported from the [`business` subpath](/en/guide/business-icons) with file-name-derived component names such as `CallingFilled`.

Example with stars:

::: sandpack {template=vanilla editorHeight=480 editorWidthPercentage=60 dependencies="ycloud"}

```html /index.html [active]
<!doctype html>
<html>
  <body>
    <div class="app">
      <div class="star-rating">
        <div class="stars">
          <i
            data-ycloud="star"
            fill="#111"
            stroke-width="0"
          ></i>
          <i
            data-ycloud="star"
            fill="#111"
            stroke-width="0"
          ></i>
          <i
            data-ycloud="star"
            fill="#111"
            stroke-width="0"
          ></i>
          <i
            data-ycloud="star"
            fill="#111"
            stroke-width="0"
          ></i>
          <i
            data-ycloud="star"
            fill="#111"
            stroke-width="0"
          ></i>
        </div>
        <div class="stars rating">
          <i
            data-ycloud="star"
            fill="yellow"
            stroke-width="0"
          ></i>
          <i
            data-ycloud="star"
            fill="yellow"
            stroke-width="0"
          ></i>
          <i
            data-ycloud="star-half"
            fill="yellow"
            stroke-width="0"
          ></i>
        </div>
      </div>
    </div>

    <script src="index.js"></script>
  </body>
</html>
```

```js /index.js
import { createIcons, Star, StarHalf } from 'ycloud/dist/cjs/ycloud';
import './styles.css';
import './icon.css';

createIcons({
  icons: {
    Star,
    StarHalf,
  },
});
```

```css icon.css
.star-rating {
  position: relative;
}

.stars {
  display: flex;
  gap: 4px;
}

.rating {
  position: absolute;
  top: 0;
}
```

:::
