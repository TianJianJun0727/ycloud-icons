---
title: 填充图标 - Angular
description: 目前并不正式支持填充图标，但仍可以通过标准 SVG 属性应用 fill，部分场景下可以得到可接受的效果。
---

<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/SandpackAngular.vue'
</script>

# 填充图标

YCloud Icons 目前并不正式支持填充图标。

不过，图标本质上是标准 SVG 元素，因此仍然可以应用 `fill` 等 SVG 属性。根据图标结构不同，实际效果可能是可接受的。

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
