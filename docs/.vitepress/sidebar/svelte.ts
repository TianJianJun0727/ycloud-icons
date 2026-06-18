import { DefaultTheme } from 'vitepress';

export const svelteSidebar = [
  {
    items: [
      {
        text: 'Overview',
        link: '/guide/svelte/',
      },
      {
        text: 'Getting started',
        link: '/guide/svelte/getting-started',
        desc: 'Learn how to get started with YCloud for Svelte.',
      },
      {
        text: 'Migration from v0',
        link: '/guide/svelte/migration',
        desc: 'Learn how to migrate from v0 to v1 of YCloud.',
      },
    ],
  },
  {
    text: 'Basics',
    items: [
      {
        text: 'Color',
        desc: 'Adjust the color of your icons',
        link: '/guide/svelte/basics/color',
      },
      {
        text: 'Sizing',
        desc: 'Adjust the size of your icons',
        link: '/guide/svelte/basics/sizing',
      },
      {
        text: 'Stroke width',
        desc: 'Adjust the stroke width of your icons',
        link: '/guide/svelte/basics/stroke-width',
      },
    ],
  },
  {
    text: 'Advanced',
    items: [
      {
        text: 'Typescript',
        link: '/guide/svelte/advanced/typescript',
        desc: 'All exported types and how to use them',
      },
      {
        text: 'Accessibility',
        link: '/guide/svelte/advanced/accessibility',
        desc: 'Making your icons accessible',
      },
      {
        text: 'Global styling',
        link: '/guide/svelte/advanced/global-styling',
        desc: 'Apply global styles to all icons',
      },
      {
        text: 'With YCloud Lab',
        link: '/guide/svelte/advanced/with-ycloud-lab',
        desc: 'Using ycloud-lab with @ycloud-web/icons-svelte',
      },
      {
        text: 'Filled icons',
        link: '/guide/svelte/advanced/filled-icons',
        desc: 'Using filled icons in @ycloud-web/icons-svelte',
      },
      {
        text: 'Combining icons',
        link: '/guide/svelte/advanced/combining-icons',
        desc: 'Combine multiple icons into one',
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
