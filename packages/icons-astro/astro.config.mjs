import { unified } from '@astrojs/markdown-remark';
import { defineConfig } from 'astro/config';

export default defineConfig({
  markdown: {
    processor: unified({
      gfm: true,
      smartypants: true,
    }),
  },
});
