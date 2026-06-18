---
description: Learn how to use YCloud icons as images in your project.
---

<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/Sandpack.vue'
</script>

# Link as Image

In some cases, you might want to use YCloud icons as images instead of inline SVGs. This can be useful for performance reasons or when you want to use the icons in contexts where inline SVGs are not supported.

## In HTML

You can link to the SVG files directly in your HTML using the `<img>` tag. The path to the SVG files will depend on how you have set up your project.

::: code-group

```html [Vite]
<html>
  <body>
    <img
      src="node_modules/@ycloud-web/icons-static/icons/smile.svg"
      alt="Smile Icon"
    />
  </body>
</html>
```

```html [Webpack]
<html>
  <body>
    <img
      src="~/@ycloud-web/icons-static/icons/smile.svg"
      alt="Smile Icon"
    />
  </body>
</html>
```

```html [CDN]
<html>
  <body>
    <img
      src="https://cdn.jsdelivr.net/npm/@ycloud-web/icons-static@latest/icons/smile.svg"
      alt="Smile Icon"
    />
  </body>
</html>
```

:::

::: warning For CDN users
Names of icons can change in future releases. Make sure you set an explicit version in the URL to avoid breaking changes.\
`https://cdn.jsdelivr.net/npm/@ycloud-web/icons-static@{version}/icons/smile.svg`
:::

## In CSS

You can also use the icons as background images in your CSS. This is useful for adding icons to buttons, links, or other elements.

::: code-group

```css [Vite]
.button {
  background-image: url('node_modules/@ycloud-web/icons-static/icons/smile.svg');
}
```

```css [Webpack]
.button {
  background-image: url('~/@ycloud-web/icons-static/icons/smile.svg');
}
```

```css [CDN]
.button {
  background-image: url('https://cdn.jsdelivr.net/npm/@ycloud-web/icons-static@latest/icons/smile.svg');
}
```

:::

::: warning For CDN users
Names of icons can change in future releases. Make sure you set an explicit version in the URL to avoid breaking changes.\
`https://cdn.jsdelivr.net/npm/@ycloud-web/icons-static@{version}/icons/smile.svg`
:::

<style>
.vp-code-group + .warning{
  display: none;
}
/* TODO: Find a better way to select this input selector */
.vp-code-group:has(.tabs input:nth-child(5):checked) + .warning {
  display: block;
}
</style>
