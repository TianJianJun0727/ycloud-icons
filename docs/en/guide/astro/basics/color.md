---
title: Color - Astro
description: Learn how to customize the color of YCloud icons in your Astro applications using the color prop and CSS.
---

# Color

By default, all icons have the color value: `currentColor`. This keyword uses the element's computed text `color` value to represent the icon color.

Read more about [`currentColor` on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#currentcolor_keyword).

## Adjust the color using the `color` prop

The color can be adjusted by passing the color prop to the element.

```astro /src/pages/index.astro
---
import Smile from '@ycloud-web/icons-astro/icons/smile';
---

<Smile color="#3e9392" />
```

## Using parent elements text color value

Because the color of ycloud icons uses `currentColor`, the color of the icon depends on the computed `color` of the element, or it inherits it from its parent.

For example, if a parent element's color value is `#fff` and one of the children is a ycloud icon, the color of the icon will be rendered as `#fff`. This is browser native behavior.

```astro /src/pages/index.astro
---
import ThumbsUp from '@ycloud-web/icons-astro/icons/thumbs-up';
---

<button style="color:#fff">
  <ThumbsUp />
  Like
</button>
```
