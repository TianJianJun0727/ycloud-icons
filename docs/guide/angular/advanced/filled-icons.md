---
title: 填充图标 - Angular
description: 了解对通用图标应用 fill 与使用独立填充业务图标的区别。
---

<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/SandpackAngular.vue'
</script>

# 填充图标

包默认入口中的通用图标采用线性描边风格，并不会为每个图标自动生成对应的填充版本。不过，图标本质上是标准 SVG 元素，因此仍然可以应用 `fill` 等 SVG 属性；实际效果取决于图标结构。

仓库还维护独立设计的业务图标。填充业务图标通过 [`business` 子入口](/guide/business-icons) 导出，名称由文件名生成，例如 `CallingFilled`。

## 星级评分示例

::: sandpack {template=angular editorHeight=580 editorWidthPercentage=60 dependencies="@ycloud-web/icons-angular"}

```css /src/app/icon.css
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

```ts /src/app/app.component.ts [active]
import { Component, ViewEncapsulation } from '@angular/core';
import { YCloudStar, YCloudStarHalf } from '@ycloud-web/icons-angular';

@Component({
  selector: 'app',
  imports: [YCloudStar, YCloudStarHalf],
  template: `
    <div class="star-rating">
      <div class="stars">
        <svg
          ycloudStar
          fill="#111"
          strokeWidth="0"
        />
        <svg
          ycloudStar
          fill="#111"
          strokeWidth="0"
        />
        <svg
          ycloudStar
          fill="#111"
          strokeWidth="0"
        />
        <svg
          ycloudStar
          fill="#111"
          strokeWidth="0"
        />
        <svg
          ycloudStar
          fill="#111"
          strokeWidth="0"
        />
      </div>
      <div class="stars rating">
        <svg
          ycloudStar
          fill="yellow"
          strokeWidth="0"
        />
        <svg
          ycloudStar
          fill="yellow"
          strokeWidth="0"
        />
        <svg
          ycloudStarHalf
          fill="yellow"
          strokeWidth="0"
        />
      </div>
    </div>
  `,
  styleUrls: ['./app.component.css', './icon.css'],
  encapsulation: ViewEncapsulation.None,
})
export class App {}
```

:::
