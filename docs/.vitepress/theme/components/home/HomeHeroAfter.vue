<script setup lang="ts">
import { useData, useRouter } from 'vitepress';
import { data } from './HomeHeroIconsCard.data';
import FakeInput from '../base/FakeInput.vue';
import { computed, nextTick } from 'vue';
import useSearchShortcut from '@theme/utils/useSearchShortcut';
import { resolveRoutePath } from '@theme/utils/navigation';

const { go } = useRouter();
const { page } = useData();
const isEnglish = computed(() => page.value.relativePath?.startsWith?.('en/') ?? false);
const iconsSearchPath = computed(() => `${isEnglish.value ? '/en' : ''}/icons/?focus`);
const { shortcutText: kbdSearchShortcut } = useSearchShortcut(() => {
  go(resolveRoutePath(iconsSearchPath.value));
});

const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

async function handleClick() {
  if (!enableTransitions()) {
    go(resolveRoutePath(iconsSearchPath.value));
    return;
  }

  await document.startViewTransition(async () => {
    await go(resolveRoutePath(iconsSearchPath.value));
    await nextTick();
  }).ready;
}
</script>
<template>
  <FakeInput
    @click="go(resolveRoutePath(iconsSearchPath.value))"
    :shortcut="kbdSearchShortcut"
    class="search-box"
  >
    {{ isEnglish ? `Search ${data.iconsCount} icons...` : `搜索 ${data.iconsCount} 个图标...` }}
  </FakeInput>
</template>

<style scoped>
.search-box {
  view-transition-name: icons-search-box;
  width: 100%;
  margin-top: 24px;
}
</style>
