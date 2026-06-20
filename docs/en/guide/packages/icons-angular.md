# YCloud Icons Angular

YCloud Icons for Angular provides standalone Angular icon components and provider-based configuration.

**You can use it to:**

- Use standalone icon components in Angular templates.
- Configure defaults through Angular providers.
- Use dynamic icons when names are resolved at runtime.

## Installation

::: code-group

```sh [pnpm]
pnpm add @ycloud-web/icons-angular@latest
```

```sh [npm]
npm install @ycloud-web/icons-angular@latest
```

```sh [yarn]
yarn add @ycloud-web/icons-angular@latest
```

```sh [bun]
bun add @ycloud-web/icons-angular@latest
```

:::

## Version Requirements

Angular `>=17.0.0`.

## Usage

```ts
import { Component } from '@angular/core';
import { YCloudHouse } from '@ycloud-web/icons-angular';

@Component({
  standalone: true,
  imports: [YCloudHouse],
  template: '<svg ycloudHouse color="#ff5a5f"></svg>',
})
export class AppComponent {}
```

## Documentation

Read the full guide: [YCloud Icons Angular](/en/guide/angular/).

## License

YCloud Icons is released under the ISC License. It is based on [Lucide](https://github.com/lucide-icons/lucide) and keeps the required upstream license and third-party notices.
