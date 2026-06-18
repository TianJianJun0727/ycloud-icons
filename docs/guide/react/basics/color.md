---
title: Color - React
description: Learn how to adjust the color of icons in your React application using the `color` prop or by using parent elements text color value.
---

<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/Sandpack.vue'
</script>

# Color

By default, all icons have the color value: `currentColor`. This keyword uses the element's computed text `color` value to represent the icon color.

Read more about [ `currentColor` on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#currentcolor_keyword).

## Adjust the color using the `color` prop

The color can be adjusted by passing the color prop to the element.

::: sandpack {template=react showTabs=false editorHeight=295 editorWidthPercentage=60 dependencies="@ycloud-web/icons-react"}

```js App.js [active]
import { Smile } from '@ycloud-web/icons-react';

function App() {
  return (
    <div className="app">
      <Smile color="#3e9392" />
    </div>
  );
}

export default App;
```

:::

## Using parent elements text color value

Because the color of ycloud icons uses `currentColor`, the color of the icon depends on the computed `color` of the element, or it inherits it from its parent.

For example, if a parent element's color value is `#fff` and one of the children is a ycloud icon, the color of the icon will be rendered as `#fff`. This is browser native behavior.

::: sandpack {template=react showTabs=false editorHeight=320 editorWidthPercentage=60 dependencies="@ycloud-web/icons-react"}

```jsx Button.jsx [active]
import { ThumbsUp } from '@ycloud-web/icons-react';

function LikeButton() {
  return (
    <button style={{ color: '#fff' }}>
      <ThumbsUp />
      Like
    </button>
  );
}

export default LikeButton;
```

```jsx App.js [hidden]
import Button from './Button';

export default function App() {
  return <Button />;
}
```

:::
