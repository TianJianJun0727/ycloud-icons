---
title: 填充图标 - React
description: 了解如何在 React 应用中为 YCloud 图标使用填充，以及这种用法的限制。
---

<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/Sandpack.vue'
</script>

# 填充图标

包默认入口中的通用图标采用线性描边风格，并不会为每个图标自动生成对应的填充版本。你仍然可以传入 `fill` 等标准 SVG 属性；它会在支持填充的图形上生效。

仓库还维护独立设计的业务图标。填充业务图标通过 [`business` 子入口](/guide/business-icons) 导出，名称由文件名生成，例如 `CallingFilled`。

下面是星级评分的示例：

::: sandpack {template=react editorHeight=580 editorWidthPercentage=60 dependencies="@ycloud-web/icons-react"}

```jsx App.js [active]
import { Star, StarHalf } from '@ycloud-web/icons-react';
import './icon.css';

function App() {
  return (
    <div className="app">
      <div className="star-rating">
        <div className="stars">
          {Array.from({ length: 5 }, () => (
            <Star
              fill="#111"
              strokeWidth={0}
            />
          ))}
        </div>
        <div className="stars rating">
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
