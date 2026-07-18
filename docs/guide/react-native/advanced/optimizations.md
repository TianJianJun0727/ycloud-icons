---
title: 性能优化 - React Native
description: 通过按图标直接导入，优化 React Native 与 Expo Web 导出的构建体积。
---

# 性能优化

默认情况下，可以从 `@ycloud-web/icons-react-native` 主入口导入图标：

```jsx
import { Camera } from '@ycloud-web/icons-react-native';
```

这种写法依赖构建工具对主入口进行 tree-shaking，只将实际使用的图标放入最终产物。原生平台通常可以正常处理；但在 Expo Web 导出中，Metro 对集中导出文件的 tree-shaking 可能不够完整，从而把未使用的图标一并打包。

## Metro 的 tree-shaking 限制

执行 `expo export --platform web` 时，Metro 会负责 JavaScript 打包。集中导入写法可能让单个图标引用关联到整个图标入口：

```jsx
// Expo Web 构建中可能包含未使用的图标
import { Camera } from '@ycloud-web/icons-react-native';
```

Expo 提供了实验性的 [React Native Web 导入优化](https://docs.expo.dev/guides/tree-shaking/#react-native-web-imports)和[移除未使用导入与导出](https://docs.expo.dev/guides/tree-shaking/#remove-unused-imports-and-exports)，但应用是否能完整移除集中入口中的未使用图标，仍取决于当前 Metro 与 Expo 配置。

## 推荐：按图标直接导入

如需确保最终产物只包含实际使用的图标，可以从独立模块直接导入：

```jsx
import Camera from '@ycloud-web/icons-react-native/icons/camera';

const App = () => {
  return <Camera />;
};

export default App;
```

每个图标都有独立文件，因此无需依赖构建工具从集中入口中移除其他图标。这个导入方式在原生端和 Web 端都可以使用。

模块名使用图标名称对应的 kebab-case。例如 `ArrowRight` 的导入路径是：

```jsx
import ArrowRight from '@ycloud-web/icons-react-native/icons/arrow-right';
```

::: tip
如果应用同时构建原生端和 Expo Web，建议统一采用按图标直接导入，以获得更可预测的构建体积。
:::
