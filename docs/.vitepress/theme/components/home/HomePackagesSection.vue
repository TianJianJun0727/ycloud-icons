<script setup lang="ts">
import HomeContainer from './HomeContainer.vue';
import HomeSectionTitle from './HomeSectionTitle.vue';
import { useRouter, withBase } from 'vitepress';
import { data } from './HomePackagesSection.data';
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue';
import { resolveRoutePath } from '@theme/utils/navigation';
import { computed } from 'vue';
import { useData } from 'vitepress';

const { go } = useRouter();
const { page } = useData();
const isEnglish = computed(() => page.value.relativePath?.startsWith?.('en/') ?? false);
const packagePath = computed(() => (isEnglish.value ? '/en/packages' : '/packages'));
</script>

<template>
  <HomeContainer>
    <HomeSectionTitle :heading-level="2">
      {{ isEnglish ? 'Available for:' : '支持平台：' }}
    </HomeSectionTitle>
    <div class="packages-list">
      <a
        v-for="{ name, logo, logoDark, path } in data.packages"
        :href="withBase(path)"
        class="package-logo"
        :aria-label="isEnglish ? `View ${name} package guide` : `查看 ${name} 包的使用说明`"
        @click.prevent="go(resolveRoutePath(isEnglish ? `/en${path}` : path))"
      >
        <img
          :src="withBase(logo)"
          :class="{ light: logoDark, 'image-logo': true }"
          :alt="`${name} logo`"
          loading="lazy"
        />

        <img
          v-if="logoDark"
          :src="withBase(logoDark)"
          :alt="`${name} logo`"
          class="image-logo dark"
          loading="lazy"
        />
      </a>
    </div>
    <div class="more-button-wrapper">
      <VPButton
        text="查看更多"
        :text="isEnglish ? 'View more' : '查看更多'"
        :href="packagePath"
        theme="alt"
        class="more-button"
      />
    </div>
  </HomeContainer>
</template>

<style scoped>
.image-logo {
  object-fit: contain;
  width: 36px;
  height: 36px;
}

.packages-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 0 -0.5rem;
  gap: 16px;
}

.more-button-wrapper {
  margin-top: 24px;
  display: flex;
  justify-content: center;
}

.package-logo {
  transition: opacity ease-in 0.15s;
}

.package-logo:hover {
  opacity: 0.6;
}

html.dark .image-logo.light {
  display: none;
}
html:not(.dark) .image-logo.dark {
  display: none;
}
</style>
