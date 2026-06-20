<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useData, withBase } from 'vitepress';
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue';
import { isActive } from 'vitepress/dist/client/shared';
import { useActiveAnchor } from '@theme/composables/useActiveAnchor';
import { data } from './CategoryList.data';
import CategoryListItem from './CategoryListItem.vue';
import SidebarTitle from './SidebarTitle.vue';
import { useCategoryViewSync } from '@theme/composables/useCategoryView';

const { page } = useData();
const { categoryCounts, selectedCategory } = useCategoryViewSync();
const isEnglish = computed(() => page.value.relativePath?.startsWith?.('en/') ?? false);

function onCategoriesClick() {
  selectedCategory.value = '';
}

const categoriesIsActive = computed(() => {
  return isActive(page.value.relativePath, isEnglish.value ? '/en/icons/categories' : '/icons/categories');
});

const overviewIsActive = computed(() => {
  return isActive(page.value.relativePath, isEnglish.value ? '/en/icons/' : '/icons/');
});

const headers = computed(() => {
  const categoryPath = isEnglish.value ? '/en/icons/categories' : '/icons/categories';
  const linkPrefix = page.value.relativePath.startsWith(
    isEnglish.value ? 'en/icons/categories' : 'icons/categories',
  )
    ? ''
    : withBase(categoryPath);

  return data.categories.map(({ name, title, englishTitle, iconCount }) => ({
    level: 2,
    link: `${linkPrefix}#${name}`,
    title: isEnglish.value ? englishTitle : title,
    iconCount: categoryCounts.value[name] ?? iconCount,
    name,
  }));
});

const overviewHref = computed(() => (isEnglish.value ? '/en/icons/' : '/icons/'));
const categoriesHref = computed(() =>
  isEnglish.value ? '/en/icons/categories' : '/icons/categories',
);

const container = ref();
const marker = ref();

const { setActiveLinkDebounced } = useActiveAnchor(container, marker);

watch(headers, () => {
  setTimeout(() => {
    setActiveLinkDebounced();
  }, 200);
});
</script>

<template>
  <div
    class="category-list"
    ref="container"
  >
    <SidebarTitle>{{ isEnglish ? 'View' : '视图' }}</SidebarTitle>
    <VPLink
      class="sidebar-link sidebar-text"
      :href="overviewHref"
      :class="{ active: overviewIsActive }"
    >
      {{ isEnglish ? 'All' : '全部' }}
    </VPLink>
    <VPLink
      class="sidebar-link sidebar-text"
      :href="categoriesHref"
      :class="{ active: categoriesIsActive }"
      @click="onCategoriesClick"
    >
      {{ isEnglish ? 'Categories' : '分类' }}
    </VPLink>
    <div class="content">
      <div
        class="outline-marker"
        ref="marker"
      />
      <nav aria-labelledby="doc-outline-aria-label">
        <CategoryListItem
          :headers="headers"
          :root="true"
        />
      </nav>
    </div>
  </div>
</template>

<style scoped>
.sidebar-text {
  line-height: 24px;
  font-size: 14px;
  display: block;
  transition: color 0.25s;
  padding: 4px 0;
}

.sidebar-link {
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.sidebar-link:hover,
.sidebar-link.active {
  color: var(--vp-c-brand);
}
.content {
  margin-top: 12px;
  position: relative;
  border-left: 1px solid var(--vp-c-divider);
  padding-left: 16px;
  font-size: 13px;
  font-weight: 500;
}

.outline-marker {
  position: absolute;
  top: 32px;
  left: -1px;
  z-index: 0;
  opacity: 0;
  width: 1px;
  height: 18px;
  background-color: var(--vp-c-brand);
  transition:
    top 0.25s cubic-bezier(0, 1, 0.5, 1),
    background-color 0.5s,
    opacity 0.25s;
}

.outline-title {
  letter-spacing: 0.4px;
  line-height: 28px;
  font-size: 13px;
  font-weight: 600;
}
.root {
  z-index: 0;
}
</style>
