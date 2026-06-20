---
title: Content Template element - YCloud
description: Learn how to include YCloud icons inside HTML template elements using the inTemplates option.
---

<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/Sandpack.vue'
</script>

# Content Template element

By default icons inside `<template>` tags are not added.
By setting the `inTemplates` option to `true`, icons inside templates will also be replaced.

More about [Content Template element on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/template).

## Example using `createIcons` function with `template` element

::: sandpack {template=vanilla editorHeight=420 editorWidthPercentage=60 dependencies="ycloud"}

```js /index.js [active]
import { createIcons, Backpack } from 'ycloud/dist/cjs/ycloud';
import './styles.css';

createIcons({
  icons: {
    Backpack,
  },
  inTemplates: true,
});

const container = document.getElementById('container');
const template = document.getElementById('template');

const firstClone = document.importNode(template.content, true);
container.appendChild(firstClone);

const secondClone = document.importNode(template.content, true);
container.appendChild(secondClone);
```

```html /index.html
<!doctype html>
<html>
  <body>
    <template id="template">
      <i data-ycloud="backpack"></i>
    </template>

    <div id="container"></div>

    <script src="index.js"></script>
  </body>
</html>
```

:::
