---
title: Typescript - Angular
description: All exported types from the `@ycloud-web/icons-angular` package and how to use them in your Angular project.
---

# TypeScript

List of exported types from the `@ycloud-web/icons-angular` package.
These can be used to type your components when using YCloud icons in a TypeScript Angular project

## Types

### `YCloudIcon`

Represents a self-containing YCloud icon component type that has a static `icon` property. You can use this type in schemas that declare an icon property.

```ts
export interface YCloudIcon extends Type<YCloudIconProps> {
  icon: YCloudIconData;
}
```

### `YCloudIconData`

A YCloud icon object that fully describes an icon to be displayed.

```ts
export type YCloudIconData = {
  name: string;
  node: YCloudIconNode[];
  aliases?: string[];
};
```

## Type guards

### `isYCloudIconData`

```ts
export function isYCloudIconData(icon: unknown): icon is YCloudIconData {
  return true | false;
}
```

### `isYCloudIconComponent`

```ts
export function isYCloudIconComponent(icon: unknown): icon is YCloudIcon {
  return true | false;
}
```
