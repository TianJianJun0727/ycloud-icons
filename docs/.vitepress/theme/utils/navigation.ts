import { withBase } from 'vitepress';

export function resolveInternalHref(path: string) {
  return withBase(path);
}

