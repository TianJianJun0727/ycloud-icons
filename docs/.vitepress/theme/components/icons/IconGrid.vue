<script setup lang="ts">
import type { IconEntity } from '@theme/types';
import IconItem from './IconItem.vue';

const emit = defineEmits(['setActiveIcon']);

defineProps<{
  icons: IconEntity[];
  activeIcon?: string;
  overlayMode?: boolean;
  hideIcons?: boolean;
}>();

function setActiveIcon(icon: IconEntity) {
  emit('setActiveIcon', icon);
}
</script>

<template>
  <div class="icons">
    <div
      class="icon"
      v-for="icon in icons"
      :key="icon.name"
    >
      <IconItem
        :iconNode="icon.iconNode"
        :name="icon.name"
        :displayName="icon.displayName"
        @setActiveIcon="setActiveIcon(icon)"
        :active="activeIcon === icon.name"
        customizable
        :overlayMode="overlayMode"
        :hideIcon="hideIcons"
      />
    </div>
  </div>
</template>

<style>
.icons {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(56px, 1fr));
  gap: 8px;
  width: 100%;
}

.icon {
  aspect-ratio: 1/1;
  position: relative;
}
</style>
