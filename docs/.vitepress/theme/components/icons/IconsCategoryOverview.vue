<script setup lang="ts">
import { ref, computed, watch, defineAsyncComponent, onMounted } from 'vue';
import type { IconEntity, Category } from '@theme/types';
import useSearch from '@theme/composables/useSearch';
import InputSearch from '../base/InputSearch.vue';
import useSearchInput from '@theme/composables/useSearchInput';
import useSearchShortcut from '@theme/utils/useSearchShortcut';
import StickyBar from './StickyBar.vue';
import IconsCategory, { CategoryRow } from './IconsCategory.vue';
import useFetchTags from '@theme/composables/useFetchTags';
import useFetchCategories from '@theme/composables/useFetchCategories';
import { useElementSize, useEventListener, useVirtualList } from '@vueuse/core';
import chunkArray from '@theme/utils/chunkArray';
import useScrollToCategory from '@theme/composables/useScrollToCategory';
import { useCategoryView } from '@theme/composables/useCategoryView';
import useSearchPlaceholder from '@theme/utils/useSearchPlaceholder.ts';
import { useData, withBase } from 'vitepress';

const ICON_SIZE = 56;
const ICON_GRID_GAP = 8;

const props = defineProps<{
  icons: IconEntity[];
  categories: Category[];
  iconCategories: Record<string, string[]>;
}>();

const activeIcon = ref<IconEntity | null>(null);
const activeIconName = computed(() => activeIcon.value?.name ?? '');
const { searchInput, searchQuery, searchQueryDebounced } = useSearchInput();
const { selectedCategory } = useCategoryView();
const isSearching = computed(() => !!searchQuery.value);
const { page } = useData();
const isEnglish = computed(() => page.value.relativePath?.startsWith?.('en/') ?? false);

watch(searchQueryDebounced, (searchString) => {
  if (searchString !== '') {
    selectedCategory.value = '';
  }
});

const { shortcutText: kbdSearchShortcut } = useSearchShortcut(() => {
  searchInput.value?.focus();
});

function setActiveIcon(icon: IconEntity) {
  activeIcon.value = icon;
}

const { execute: fetchTags, data: tags } = useFetchTags();
const { execute: fetchCategories, data: categoriesMap } = useFetchCategories();

const overviewEl = ref<HTMLElement | null>(null);
const { width: containerWidth } = useElementSize(overviewEl);

const columnSize = computed(() => {
  return Math.floor(containerWidth.value / (ICON_SIZE + ICON_GRID_GAP));
});

const mappedIcons = computed(() => {
  return props.icons.map((icon) => {
    const iconTags = tags.value?.[icon.name] ?? icon.tags ?? [];
    const iconCategories = categoriesMap.value?.[icon.name] ?? [];
    return {
      ...icon,
      tags: iconTags,
      categories: iconCategories,
    };
  });
});

const searchKeys = computed(() =>
  isEnglish.value
    ? [
        { name: 'displayName', weight: 3 },
        { name: 'aliases', weight: 3 },
        { name: 'displayTags', weight: 2 },
        { name: 'displayCategories', weight: 1 },
      ]
    : [
        { name: 'displayName', weight: 3 },
        { name: 'displayTags', weight: 2 },
        { name: 'displayCategories', weight: 1 },
      ],
);

const searchResults = useSearch(searchQueryDebounced, mappedIcons, searchKeys);

const categories = computed(() => {
  if (!props.categories?.length || !props.icons?.length) return [];

  return props.categories.map(({ name, title, englishTitle }) => {
    const categoryIcons = props.icons.filter((icon) => {
      const iconCategories = props.iconCategories[icon.name];

      return iconCategories?.includes(name);
    });

    const searchedCategoryIcons = isSearching
      ? categoryIcons.filter((icon) =>
          searchResults.value.some((item) => item?.name === icon?.name),
        )
      : categoryIcons;

    return {
      title,
      englishTitle,
      name,
      icons: searchedCategoryIcons,
    };
  });
});

const categoriesList = computed(() => {
  return categories.value
    .filter(({ icons }) => icons.length)
    .reduce<CategoryRow[]>((acc, category) => {
      acc.push({
        type: 'category',
        title: isEnglish.value ? category.englishTitle : category.title,
        name: category.name,
      });

      const categoryIcons = chunkArray(category.icons, columnSize.value);
      categoryIcons.forEach((icons) => {
        acc.push({ type: 'icons', icons });
      });

      return acc;
    }, []);
});
const searchPlaceholder = useSearchPlaceholder(searchQuery, searchResults);

const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(categoriesList, {
  itemHeight: ICON_SIZE + ICON_GRID_GAP,
  overscan: 10,
});

useScrollToCategory({
  categories,
  categoriesList,
  scrollTo,
  searchQueryDebounced,
});

onMounted(() => {
  containerProps.ref.value = document.documentElement;
  useEventListener(window, 'scroll', containerProps.onScroll);
});

function onFocusSearchInput() {
  if (tags.value == null) {
    fetchTags();
  }
  if (categoriesMap.value == null) {
    fetchCategories();
  }
}

const NoResults = defineAsyncComponent(() => import('./NoResults.vue'));
const IconDetailOverlay = defineAsyncComponent(() => import('./IconDetailOverlay.vue'));

function handleCloseDrawer() {
  activeIcon.value = null;

  const url = new URL(window.location);
  url.pathname = withBase(isEnglish.value ? '/en/icons/categories' : '/icons/categories');

  if (searchQueryDebounced.value) {
    url.searchParams.set('search', searchQueryDebounced.value);
  }

  if (selectedCategory.value) {
    url.hash = selectedCategory.value;
  }

  window.history.pushState({}, '', url);
}
</script>

<template>
  <div
    ref="overviewEl"
    class="overview-container"
    :class="{ 'icon-drawer-open': activeIconName }"
  >
    <StickyBar class="category-search">
      <InputSearch
        :placeholder="
          isEnglish ? `Search ${icons.length} icons...` : `搜索 ${icons.length} 个图标…`
        "
        v-model="searchQuery"
        :shortcut="kbdSearchShortcut"
        class="input-wrapper"
        ref="searchInput"
        @focus="onFocusSearchInput"
      />
    </StickyBar>
    <NoResults
      v-if="searchPlaceholder.isNoResults"
      :searchQuery="searchPlaceholder.query"
      :isBrandSearch="searchPlaceholder.isBrand"
      @clear="searchQuery = ''"
    />
    <div v-bind="wrapperProps">
      <IconsCategory
        v-for="{ index, data } in list"
        :categoryRow="data"
        :activeIconName="activeIconName"
        @setActiveIcon="setActiveIcon"
        :key="index"
      />
    </div>
  </div>
  <IconDetailOverlay
    v-if="activeIcon != null"
    :icon="activeIcon"
    @close="handleCloseDrawer"
  />
</template>

<style scoped>
.input-wrapper {
  width: 100%;
}

.search-bar.category-search {
  margin-bottom: 10px;
}

.title {
  margin-bottom: 8px;
  font-size: 19px;
  font-weight: 500;
  padding: 24px 0 8px;
}

.icons {
  margin-bottom: 8px;
}
</style>
