<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/Sandpack.vue'
</script>

# Use YCloud in Node.js

You can also import YCloud icons in Node.js projects, with the @ycloud-web/icons-static package.
Each icon is exported as a string containing the SVG markup, which can be used in server-side rendering or static site generation.

::: code-group

```js [ESM]
import { MessageSquare } from '@ycloud-web/icons-static';
```

```js [CommonJs]
const { MessageSquare } = require('@ycloud-web/icons-static');
```

:::

> Note: Each icon name is in PascalCase. You can find the icon names in the [YCloud Icons page](https://tianjianjun0727.github.io/ycloud-icons/icons).

## Example with Node.js

::: sandpack {template=node showTabs=false editorHeight=480 editorWidthPercentage=60 dependencies="@ycloud-web/icons-static"}

```js /index.js [active]
import http from 'http';
import { MessageSquare } from '@ycloud-web/icons-static';

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');

  res.end(`
    <!DOCTYPE html>
    <html>
      <body>
        <h1>YCloud Icons</h1>
        <p>This is a YCloud icon ${MessageSquare}</p>

      </body>
    </html>
  `);
});

const hostname = '127.0.0.1';
const port = 3000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

:::
