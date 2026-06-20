import { unified } from '@astrojs/markdown-remark';
import type { AstroContainerUserConfig } from 'astro/container';

export const astroTestConfig = {
  markdown: {
    processor: unified({
      gfm: true,
      smartypants: true,
    }),
  },
} satisfies AstroContainerUserConfig;
