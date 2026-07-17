<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  svg: string;
  size?: number;
  colorMode?: string;
  supportsStrokeWidth?: boolean;
}>();

const supportsStrokeWidth = computed(() => props.supportsStrokeWidth !== false);
</script>

<template>
  <div
    class="business-icon-preview"
    :class="{ 'supports-stroke-width': supportsStrokeWidth }"
    :style="size ? { '--business-preview-size': `${size}px` } : undefined"
    v-html="svg"
  />
</template>

<style scoped>
.business-icon-preview {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--business-preview-size, calc(var(--customize-size, 24) * 1px));
  height: var(--business-preview-size, calc(var(--customize-size, 24) * 1px));
  color: var(--customize-color, var(--vp-c-text-1));
  --business-icon-primary-color: var(--customize-color, var(--vp-c-text-1));
  --business-icon-secondary-color: #fff;
}

.business-icon-preview :deep(svg) {
  display: block;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
}

.business-icon-preview.supports-stroke-width :deep(svg) {
  stroke-width: var(--customize-business-strokeWidth);
}

.business-icon-preview.supports-stroke-width :deep(svg *) {
  stroke-width: var(--customize-business-strokeWidth);
}
</style>
