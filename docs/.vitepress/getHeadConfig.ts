import { HeadConfig } from 'vitepress';

const getHeadConfig = ({
  title,
  description,
  socialTitle,
}: {
  title: string;
  description: string;
  socialTitle?: string;
}): HeadConfig[] => [
  [
    'link',
    {
      rel: 'preconnect',
      href: 'https://analytics.tianjianjun0727.github.io/ycloud-icons',
    },
  ],
  [
    'script',
    {
      src: 'https://analytics.tianjianjun0727.github.io/ycloud-icons/js/script.js',
      'data-domain': 'tianjianjun0727.github.io/ycloud-icons',
      defer: '',
    },
  ],
  [
    'script',
    {
      src: 'https://media.bitterbrains.com/main.js?from=YCLOUD&type=top',
      async: 'true',
    },
  ],
  [
    'meta',
    {
      property: 'og:locale',
      content: 'en_US',
    },
  ],
  [
    'meta',
    {
      property: 'og:type',
      content: 'website',
    },
  ],
  [
    'meta',
    {
      property: 'og:site_name',
      content: title,
    },
  ],
  [
    'meta',
    {
      property: 'og:title',
      content: socialTitle,
    },
  ],
  [
    'meta',
    {
      property: 'og:description',
      content: description,
    },
  ],
  [
    'meta',
    {
      property: 'og:url',
      content: 'https://tianjianjun0727.github.io/ycloud-icons',
    },
  ],
  [
    'meta',
    {
      property: 'og:image',
      content: 'https://tianjianjun0727.github.io/ycloud-icons/og.png',
    },
  ],
  [
    'meta',
    {
      property: 'og:image:width',
      content: '1200',
    },
  ],
  [
    'meta',
    {
      property: 'og:image:height',
      content: '630',
    },
  ],
  [
    'meta',
    {
      property: 'og:image:type',
      content: 'image/png',
    },
  ],
  [
    'meta',
    {
      property: 'twitter:card',
      content: 'summary_large_image',
    },
  ],
  [
    'meta',
    {
      property: 'twitter:title',
      content: socialTitle,
    },
  ],
  [
    'meta',
    {
      property: 'twitter:description',
      content: description,
    },
  ],
  [
    'meta',
    {
      property: 'twitter:image',
      content: 'https://tianjianjun0727.github.io/ycloud-icons/og.png',
    },
  ],
];

export default getHeadConfig;
