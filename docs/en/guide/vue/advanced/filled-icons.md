---
title: Filled Icons - Vue
description: Learn how to use fills with YCloud icons in your Vue application, and the limitations of using fills with YCloud icons.
---

<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/SandpackVue.vue'
</script>

# Filled Icons

Generic icons from the package's default entrypoint are stroke-based and do not include an automatically generated filled counterpart for every icon. You can still pass standard SVG properties such as `fill`, which works for shapes that support it.

Authored business icons are separate assets. Filled business icons are exported from the [`business` subpath](/en/guide/business-icons) with file-name-derived component names such as `CallingFilled`.

Example with stars:

::: sandpack {template=vue editorHeight=580 editorWidthPercentage=60 dependencies="@ycloud-web/icons-vue"}

```vue src/App.vue [active]
<script setup>
import { Star, StarHalf } from '@ycloud-web/icons-vue';
import './icon.css';
</script>

<template>
  <div class="app">
    <div class="star-rating">
      <div class="stars">
        <Star
          v-for="i in 5"
          fill="#111"
          strokeWidth="0"
        />
      </div>
      <div class="stars rating">
        <Star
          fill="yellow"
          strokeWidth="0"
        />
        <Star
          fill="yellow"
          strokeWidth="0"
        />
        <StarHalf
          fill="yellow"
          strokeWidth="0"
        />
      </div>
    </div>
  </div>
</template>
```

```css src/icon.css
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
