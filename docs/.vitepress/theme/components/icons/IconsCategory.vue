<script lang="ts">
import { IconEntity } from '@theme/types';

type CategoryNameRow = {
  type: 'category';
  title: string;
  name: string;
};

type CategoryIconsRow = {
  type: 'icons';
  icons: IconEntity[];
};

export type CategoryRow = CategoryNameRow | CategoryIconsRow;
</script>

<script setup lang="ts">
import IconGrid from './IconGrid.vue';
import { computed } from 'vue';
import { useData } from 'vitepress';

defineProps<{
  activeIconName: string | null;
  categoryRow: CategoryRow;
}>();

const emit = defineEmits(['setActiveIcon']);
const { page } = useData();
const isEnglish = computed(() => page.value.relativePath?.startsWith?.('en/') ?? false);
</script>

<template>
  <h2
    v-if="categoryRow.type === 'category'"
    class="title"
    :id="categoryRow.name"
  >
    <a
      class="header-anchor"
      :href="`#${categoryRow.name}`"
      :aria-label="
        isEnglish
          ? `Permalink to &quot;${categoryRow.title}&quot;`
          : `跳转到“${categoryRow.title}”分类`
      "
      >&ZeroWidthSpace;</a
    >
    {{ categoryRow.title }}
  </h2>
  <IconGrid
    v-else-if="categoryRow.type === 'icons'"
    :activeIcon="activeIconName"
    :icons="categoryRow.icons"
    @setActiveIcon="($event) => $emit('setActiveIcon', $event)"
    overlayMode
  />
</template>

<style scoped>
.title {
  margin-bottom: 8px;
  font-size: 19px;
  font-weight: 500;
  padding: 24px 0 8px;
}
</style>
