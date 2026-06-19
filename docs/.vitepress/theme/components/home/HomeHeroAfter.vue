<script setup lang="ts">
import { useRouter } from 'vitepress';
import Badge from '../base/Badge.vue';
import HomeContainer from './HomeContainer.vue';
import { data } from './HomeHeroIconsCard.data';
import FakeInput from '../base/FakeInput.vue';
import { nextTick, provide } from 'vue';
import useSearchShortcut from '../../utils/useSearchShortcut';
import { resolveBrowserHref, resolveRoutePath } from '../../utils/navigation';

const { go } = useRouter();
const iconsSearchPath = '/icons/?focus';
const iconsSearchHref = resolveBrowserHref(iconsSearchPath);

const { shortcutText: kbdSearchShortcut } = useSearchShortcut(() => {
  go(resolveRoutePath(iconsSearchPath));
});

const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

async function handleClick(event: MouseEvent) {
  if (!enableTransitions()) {
    go(resolveRoutePath(iconsSearchPath));
    return;
  }

  await document.startViewTransition(async () => {
    await go(resolveRoutePath(iconsSearchPath));
    await nextTick();
  }).ready;
}
</script>
<template>
  <FakeInput
    @click="go(resolveRoutePath(iconsSearchPath))"
    :shortcut="kbdSearchShortcut"
    class="search-box"
  >
    搜索 {{ data.iconsCount }} 个图标...
  </FakeInput>
</template>

<style scoped>
.search-box {
  view-transition-name: icons-search-box;
  width: 100%;
  margin-top: 24px;
}
</style>
