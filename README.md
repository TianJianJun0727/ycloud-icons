# YCloud Icons

YCloud Icons 是一个支持多框架的图标工具集，基于 [Lucide](https://github.com/lucide-icons/lucide) fork 演进。

第一阶段保留 Lucide 已验证的 SVG 源数据格式、生成流程和组件 API 形态，同时将公开包统一迁移到 `@ycloud-web` npm scope 下。

## 包

| 目标            | 包                        | 源码目录                |
| --------------- | ------------------------- | ----------------------- |
| Core JavaScript | `@ycloud-web/icons`       | `packages/ycloud`       |
| React           | `@ycloud-web/icons-react` | `packages/ycloud-react` |
| Vue             | `@ycloud-web/icons-vue`   | `packages/vue`          |
| 图标数据        | `@ycloud-web/icons-data`  | `packages/icons`        |

来自 Lucide 上游的其他框架包仍保留在仓库中，待 React/Vue 流程稳定后再逐步统一命名和发布。

## 组件命名

组件名目前有意保留上游风格：

```tsx
import { Camera } from '@ycloud-web/icons-react';

export function Example() {
  return <Camera size={24} />;
}
```

这样可以保留完整的 TypeScript 自动补全、安全重构和 tree-shaking 行为。

## 风格策略

规划中的双风格模型会通过包入口或目录区分，而不是给组件名追加后缀：

```tsx
import { Camera } from '@ycloud-web/icons-react/outline';
import { Camera as FilledCamera } from '@ycloud-web/icons-react/filled';
```

公开组件名保持稳定（`Camera`），源图标名也保持稳定（`camera`）。最终选择哪个入口，决定生成的 SVG 是 outline 还是 filled。

## 开发

```sh
pnpm install
pnpm icons-react build
pnpm icons-vue build
pnpm --filter @ycloud-web/icons-docs docs:dev
```

## 许可证与来源

本项目基于 Lucide fork 演进，并保留上游 ISC 许可证。详见 [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md) 和 [LICENSE](./LICENSE)。
