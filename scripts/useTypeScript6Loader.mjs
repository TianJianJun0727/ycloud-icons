/**
 * ESM loader：把部分工具链中的 typescript 导入临时映射到 TypeScript 6。
 * 用于兼容尚未完全支持 TypeScript 7 RC 的构建工具。
 */
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
const typeScript6Url = pathToFileURL(require.resolve('@typescript/typescript6')).href;

export async function resolve(specifier, context, nextResolve) {
  if (specifier === 'typescript') {
    return {
      shortCircuit: true,
      url: typeScript6Url,
    };
  }

  return nextResolve(specifier, context);
}
