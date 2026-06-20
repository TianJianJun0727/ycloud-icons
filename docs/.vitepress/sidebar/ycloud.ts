import { DefaultTheme } from 'vitepress';

export const ycloudSidebar = [
  {
    items: [
      {
        text: 'Overview',
        link: '/guide/ycloud/',
      },
      {
        text: 'Getting started',
        link: '/guide/ycloud/getting-started',
        desc: 'Learn how to get started with YCloud Icons.',
      },
    ],
  },
  {
    text: 'Basics',
    items: [
      {
        text: 'Color',
        desc: 'Adjust the color of your icons.',
        link: '/guide/ycloud/basics/color',
      },
      {
        text: 'Sizing',
        desc: 'Adjust the size of your icons.',
        link: '/guide/ycloud/basics/sizing',
      },
      {
        text: 'Stroke width',
        desc: 'Adjust the stroke width of your icons.',
        link: '/guide/ycloud/basics/stroke-width',
      },
    ],
  },
  {
    text: 'Advanced',
    items: [
      {
        text: 'Global styling',
        link: '/guide/ycloud/advanced/global-styling',
        desc: 'Apply options and styles globally.',
      },
      {
        text: 'Shadow DOM',
        link: '/guide/ycloud/advanced/shadow-dom',
        desc: 'Render and replace icons inside Shadow DOM.',
      },
      {
        text: 'Template element',
        link: '/guide/ycloud/advanced/content-template-element',
        desc: 'Using content template element with YCloud Icons.',
      },
      {
        text: 'Accessibility',
        link: '/guide/ycloud/advanced/accessibility',
        desc: 'Making your icons accessible.',
      },
      {
        text: 'Filled icons',
        link: '/guide/ycloud/advanced/filled-icons',
        desc: 'Using filled icons in ycloud.',
      },
    ],
  },
] satisfies DefaultTheme.SidebarItem[] & { items: { desc?: string }[] }[];
