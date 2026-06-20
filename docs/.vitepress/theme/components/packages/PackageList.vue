<script setup lang="ts">
import { data } from './PackageList.data'
import GridSection from '../base/GridSection.vue'
import PackageListItem from "./PackageListItem.vue";
import { computed } from 'vue';
import { useData } from 'vitepress';

const { page } = useData();
const isEnglish = computed(() => page.value.relativePath?.startsWith?.('en/') ?? false);
</script>

<template>
  <GridSection
    :title="isEnglish ? 'Packages' : '包'"
    :headingLevel="1"
    class="package-group"
  >
    <PackageListItem
      v-for="packageData in data.packages"
      :packageData="packageData"
      :isEnglish="isEnglish"
    />
  </GridSection>
</template>

<style scoped>
.name {
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 32px;
}

.package-group {
  margin-bottom: 96px;
}
</style>
