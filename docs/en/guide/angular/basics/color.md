---
title: Color - Angular
description: Learn how to adjust the color of icons in your Angular application using the `color` input or by using parent elements text color value.
---

<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/SandpackAngular.vue'
</script>

# Color

By default, all icons have the color value: `currentColor`. This keyword uses the element's computed text `color` value to represent the icon color.

Read more about [ `currentColor` on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#currentcolor_keyword).

## Adjust the color using the `color` input

The color can be adjusted by binding the `color` input of the element.

::: sandpack {template=angular showTabs=false editorHeight=400 editorWidthPercentage=60 dependencies="@ycloud-web/icons-angular"}

```ts /src/app/app.component.ts [active]
import { Component, ViewEncapsulation } from '@angular/core';
import { YCloudSmile } from '@ycloud-web/icons-angular';

@Component({
  selector: 'app',
  imports: [YCloudSmile],
  template: `<svg
    ycloudSmile
    color="#3e9392"
  />`,
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class App {}
```

:::

## Using parent elements text color value

Because the color of ycloud icons uses `currentColor`, the color of the icon depends on the computed `color` of the element, or it inherits it from its parent.

For example, if a parent element's color value is `#fff` and one of the children is a ycloud icon, the color of the icon will be rendered as `#fff`. This is browser native behavior.

::: sandpack {template=angular showTabs=false editorHeight=400 editorWidthPercentage=60 dependencies="@ycloud-web/icons-angular"}

```ts /src/app/app.component.ts [active]
import { Component, ViewEncapsulation } from '@angular/core';
import { YCloudThumbsUp } from '@ycloud-web/icons-angular';

@Component({
  selector: 'app',
  imports: [YCloudThumbsUp],
  template: `
    <button style="color:#fff">
      <svg ycloudThumbsUp></svg>
      Like
    </button>
  `,
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class App {}
```

:::
