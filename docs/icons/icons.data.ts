import * as iconDetails from '../.vitepress/data/iconDetails';

export default {
  async load() {
    return {
      icons: Object.entries(iconDetails).map(
        ([
          ,
          {
            name,
            displayName,
            tags,
            displayTags,
            categories,
            displayCategories,
            iconNode,
            popularity,
            createdRelease,
          },
        ]) => ({
          name,
          displayName,
          tags,
          displayTags,
          categories,
          displayCategories,
          iconNode,
          popularity: popularity?.count ?? 0,
          createdRelease,
        }),
      ),
    };
  },
};
