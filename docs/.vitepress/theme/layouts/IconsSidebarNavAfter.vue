<script setup>
import { useData } from 'vitepress';
import { computed } from 'vue';

import CategoryList from '../components/icons/CategoryList.vue';
import SidebarIconCustomizer from '../components/icons/SidebarIconCustomizer.vue';

const { page } = useData();

const isIconsPage = computed(() => {
  const relativePath = page.value?.relativePath ?? '';

  return relativePath.startsWith('icons/') || relativePath.startsWith('en/icons/');
});
</script>

<template>
  <div>
    <SidebarIconCustomizer v-if="isIconsPage" />
    <CategoryList v-if="isIconsPage" />
  </div>
</template>
