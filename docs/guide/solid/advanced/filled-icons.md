---
title: 填充图标 - Solid
description: 了解如何在 Solid 应用中为 YCloud Icons 使用填充，以及这种用法的限制。
---

<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/SandpackSolid.vue'
</script>

# 填充图标

包默认入口中的通用图标采用线性描边风格，并不会为每个图标自动生成对应的填充版本。你仍然可以传入 `fill` 等标准 SVG 属性；它会在支持填充的图形上生效。

仓库还维护独立设计的业务图标。填充业务图标通过 [`business` 子入口](/guide/business-icons) 导出，名称由文件名生成，例如 `CallingFilled`。

下面是星级评分的示例：

::: sandpack {template=vite-solid editorHeight=580 editorWidthPercentage=60 dependencies="@ycloud-web/icons-solid"}

```tsx App.tsx [active]
import Star from '@ycloud-web/icons-solid/icons/star';
import StarHalf from '@ycloud-web/icons-solid/icons/star-half';

import './icon.css';

function App() {
  return (
    <div class="app">
      <div class="star-rating">
        <div class="stars">
          {Array.from({ length: 5 }, () => (
            <Star
              fill="#111"
              strokeWidth={0}
            />
          ))}
        </div>
        <div class="stars rating">
          <Star
            fill="yellow"
            strokeWidth={0}
          />
          <Star
            fill="yellow"
            strokeWidth={0}
          />
          <StarHalf
            fill="yellow"
            strokeWidth={0}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
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
