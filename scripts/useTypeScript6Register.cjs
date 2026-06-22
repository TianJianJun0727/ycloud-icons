/**
 * CommonJS require hook：把部分工具链中的 typescript require 临时映射到 TypeScript 6。
 *
 * 输入：Node CommonJS `require` 请求。
 * 行为：拦截 `require('typescript')`，返回 `@typescript/typescript6`，并补齐 default 导出兼容形态。
 *
 * 适用场景：ng-packagr、rollup-plugin-dts 等 CommonJS 工具在 TS7 RC 下不兼容时，局部使用 TS6 运行。
 * 调用位置：多个 packages 子包 package.json 的 build 命令通过 `NODE_OPTIONS --require` 引入。
 * 调用时机：框架包构建时自动启用，不需要人工单独运行。
 */
const Module = require('node:module');
const { createRequire } = require('node:module');

const localRequire = createRequire(__filename);
const typeScript6 = localRequire('@typescript/typescript6');
const typeScript6Compat = {
  __esModule: true,
  ...typeScript6,
  default: typeScript6,
};
const originalLoad = Module._load;

Module._load = function loadTypeScript(request, parent, isMain) {
  if (request === 'typescript') {
    return typeScript6Compat;
  }

  return originalLoad.call(this, request, parent, isMain);
};
