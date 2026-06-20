<script setup lang="ts">
import type { IconEntity } from '@theme/types';
import IconGrid from './IconGrid.vue';
import { computed } from 'vue';
import { useData } from 'vitepress';

defineProps<{
  icons: IconEntity[];
}>();

const { page } = useData();
const isEnglish = computed(() => page.value.relativePath?.startsWith?.('en/') ?? false);
</script>

<template>
  <section class="related-icons">
    <h2 class="title">{{ isEnglish ? 'Related icons' : '相关图标' }}</h2>
    <IconGrid :icons="icons" />
  </section>
</template>

<style scoped>
.related-icons {
  margin-bottom: 32px;
}
</style>
