---
title: Filled Icons - React
description: Learn how to use fills with YCloud icons in your React application, and the limitations of using fills with YCloud icons.
---

<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/Sandpack.vue'
</script>

# Filled Icons

Generic icons from the package's default entrypoint are stroke-based and do not include an automatically generated filled counterpart for every icon. You can still pass standard SVG properties such as `fill`, which works for shapes that support it.

Authored business icons are separate assets. Filled business icons are exported from the [`business` subpath](/en/guide/business-icons) with file-name-derived component names such as `CallingFilled`.

Example with stars:

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
