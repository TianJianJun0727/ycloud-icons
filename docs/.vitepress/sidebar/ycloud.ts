import { DefaultTheme } from 'vitepress';

export const ycloudSidebar = [
  {
    items: [
      {
        text: '概览',
        link: '/guide/ycloud/',
      },
      {
        text: '快速开始',
        link: '/guide/ycloud/getting-started',
        desc: '了解如何开始使用 YCloud Icons。',
      },
    ],
  },
  {
    text: '基础',
    items: [
      {
        text: '颜色',
        desc: '调整图标颜色。',
        link: '/guide/ycloud/basics/color',
      },
      {
        text: '尺寸',
        desc: '调整图标尺寸。',
        link: '/guide/ycloud/basics/sizing',
      },
      {
        text: '描边宽度',
        desc: '调整图标描边宽度。',
        link: '/guide/ycloud/basics/stroke-width',
      },
    ],
  },
  {
    text: '进阶',
    items: [
      {
        text: '全局样式',
        link: '/guide/ycloud/advanced/global-styling',
        desc: '全局应用选项和样式。',
      },
      {
        text: 'Shadow DOM',
        link: '/guide/ycloud/advanced/shadow-dom',
        desc: '在 Shadow DOM 中渲染和替换图标。',
      },
      {
        text: '模板元素',
        link: '/guide/ycloud/advanced/content-template-element',
        desc: '在 YCloud Icons 中使用内容模板元素。',
      },
      {
        text: '无障碍',
        link: '/guide/ycloud/advanced/accessibility',
        desc: '让图标更易访问。',
      },
      {
        text: '填充图标',
        link: '/guide/ycloud/advanced/filled-icons',
        desc: '在 YCloud Icons 中使用填充图标。',
      },
    ],
  },
] satisfies DefaultTheme.SidebarItem[] & { items: { desc?: string }[] }[];
