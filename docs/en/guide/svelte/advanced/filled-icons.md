---
title: Filled Icons - Svelte
description: Learn how to use fills with YCloud icons in your Svelte application, and the limitations of using fills with YCloud icons.
---

<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/SandpackSvelte.vue';
</script>

# Filled Icons

Generic icons from the package's default entrypoint are stroke-based and do not include an automatically generated filled counterpart for every icon. You can still pass standard SVG properties such as `fill`, which works for shapes that support it.

Authored business icons are separate assets. Filled business icons are exported from the [`business` subpath](/en/guide/business-icons) with file-name-derived component names such as `CallingFilled`.

Example with stars:

::: sandpack {template=vite-svelte showTabs=false editorHeight=480 editorWidthPercentage=60}

```svelte src/App.svelte [active]
<script>
import Star from '@ycloud-web/icons-svelte/icons/star';
import StarHalf from '@ycloud-web/icons-svelte/icons/star-half';
import "./icon.css";

const items = Array.from({ length: 5 })
</script>

<div class="app">
  <div class="star-rating">
    <div class="stars">
      {#each items as item}
        <Star
          fill="#111"
          strokeWidth="0"
        />
      {/each}
    </div>
    <div class="stars rating">
      <Star fill="yellow" strokeWidth="0" />
      <Star fill="yellow" strokeWidth="0" />
      <StarHalf fill="yellow" strokeWidth="0" />
    </div>
  </div>
</div>
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
