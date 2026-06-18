---
title: With YCloud Lab or custom icons - YCloud
description: Learn how to use YCloud Lab or custom icons in your Vanilla JavaScript applications.
---

<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/Sandpack.vue'
</script>

# With YCloud Lab or custom icons

[YCloud Lab](https://github.com/TianJianJun0727/ycloud-icons-lab) is a collection of icons that are not part of the YCloud main library.

They can be used by adding the `@ycloud-web/icons-lab` package to your project.
All props like regular ycloud icons can be passed to adjust the icon appearance.

## Using YCloud Lab icons

This creates a single icon based on the iconNode passed and renders a YCloud icon component.

::: sandpack {template=vanilla editorHeight=295 editorWidthPercentage=60 dependencies="ycloud,@ycloud-web/icons-lab"}

```html /index.html [active]
<!doctype html>
<html>
  <body>
    <i data-ycloud="avocado"></i>

    <script src="index.js"></script>
  </body>
</html>
```

```js /index.js
import './styles.css';

import { createIcons, Smile } from 'ycloud/dist/cjs/ycloud';
import { avocado as Avocado } from '@ycloud-web/icons-lab';

createIcons({
  icons: {
    Avocado,
  },
});
```

:::
