import { DefaultTheme } from 'vitepress';

export const astroSidebar = [
  {
    items: [
      {
        text: 'Overview',
        link: '/guide/astro/',
      },
      {
        text: 'Getting started',
        link: '/guide/astro/getting-started',
        desc: 'Learn how to get started with YCloud for Astro.',
      },
      {
        text: 'Migration from v0',
        link: '/guide/astro/migration',
        desc: 'Learn how to migrate from v0 to v1 of YCloud Astro.',
      },
    ],
  },
  {
    text: 'Basics',
    items: [
      {
        text: 'Color',
        desc: 'Adjust the color of your icons',
        link: '/guide/astro/basics/color',
      },
      {
        text: 'Sizing',
        desc: 'Adjust the size of your icons',
        link: '/guide/astro/basics/sizing',
      },
      {
        text: 'Stroke width',
        desc: 'Adjust the stroke width of your icons',
        link: '/guide/astro/basics/stroke-width',
      },
    ],
  },
  {
    text: 'Advanced',
    items: [
      {
        text: 'Typescript',
        link: '/guide/astro/advanced/typescript',
        desc: 'All exported types and how to use them',
      },
      {
        text: 'Accessibility',
        link: '/guide/astro/advanced/accessibility',
        desc: 'Making your icons accessible',
      },
      {
        text: 'Global styling',
        link: '/guide/astro/advanced/global-styling',
        desc: 'Apply global styles to all icons',
      },
      {
        text: 'With YCloud Lab',
        link: '/guide/astro/advanced/with-ycloud-lab',
        desc: 'Using ycloud-lab with @ycloud-web/icons-astro',
      },
    ],
  },
  {
    text: 'Resources',
    items: [
      {
        text: 'Accessibility in depth',
        link: '/guide/accessibility',
        desc: 'Accessibility best practices',
      },
      {
        text: 'VSCode',
        link: '/guide/vscode',
        desc: 'VSCode and YCloud',
      },
    ],
  },
] satisfies DefaultTheme.SidebarItem[] & { items: { desc?: string }[] }[];
