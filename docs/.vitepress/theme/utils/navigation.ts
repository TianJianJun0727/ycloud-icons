import { withBase } from 'vitepress';

export function resolveBrowserHref(path: string) {
  return withBase(path);
}

export function resolveRoutePath(path: string) {
  const base = import.meta.env.BASE_URL || '/';

  if (base !== '/' && path.startsWith(base)) {
    return `/${path.slice(base.length).replace(/^\/+/, '')}`;
  }

  return path;
}
