import { PageData } from 'vitepress';

export default async function getStructuredData(iconName: string, pageData: PageData) {
  const url = `https://tianjianjun0727.github.io/ycloud-icons/icons/${iconName}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': url,
    name: pageData.title,
    description: pageData.description,
    url,
    inLanguage: 'en',
    isPartOf: {
      '@type': 'WebSite',
      name: 'YCloud Icons',
      url: 'https://tianjianjun0727.github.io/ycloud-icons',
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Icons',
          item: 'https://tianjianjun0727.github.io/ycloud-icons/icons',
        },
        { '@type': 'ListItem', position: 2, name: iconName, item: url },
      ],
    },
    mainEntity: {
      '@type': 'ImageObject',
      '@id': `${url}#icon`,
      name: iconName,
      // TODO: Add support for description extraction from icon metadata
      // description: 'An ...SVG icon from the YCloud icon set.',
      contentUrl: `https://tianjianjun0727.github.io/ycloud-icons/api/icons/${iconName}}?width=24&height=24&background=white`,
      thumbnailUrl: `https://tianjianjun0727.github.io/ycloud-icons/api/icons/${iconName}}?width=256&height=256&background=white`,
      encodingFormat: 'image/svg+xml',
      keywords: pageData.params?.tags,
      width: 24,
      height: 24,
      creator: {
        '@type': 'Organization',
        name: 'YCloud Icons',
      },
      datePublished: pageData?.params?.createdRelease?.date,
      dateModified: pageData?.params?.changedRelease?.date,
    },
  };
}
