---
title: 填充图标 - YCloud Icons
description: 了解对通用图标应用 fill 与使用独立填充业务图标的区别。
---

<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/Sandpack.vue'
</script>

# 填充图标

包默认入口中的通用图标采用线性描边风格，并不会为每个图标自动生成对应的填充版本。你仍然可以传入 `fill` 等标准 SVG 属性；它会在支持填充的图形上生效。

仓库还维护独立设计的业务图标。填充业务图标通过 [`business` 子入口](/guide/business-icons) 导出，名称由文件名生成，例如 `CallingFilled`。

下面是星级评分的示例：

::: sandpack {template=vanilla editorHeight=480 editorWidthPercentage=60 dependencies="@ycloud-web/icons"}

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
import { createIcons, Star, StarHalf } from '@ycloud-web/icons';
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
