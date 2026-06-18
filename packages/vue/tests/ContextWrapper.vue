<script setup lang="ts">
import { setYCloudProps } from '../src/context';
import { House } from '../src/ycloud-vue';

const props = defineProps<{
  size?: number;
  color?: string;
  strokeWidth?: number;
}>();

setYCloudProps({
  size: 48,
  color: 'red',
  strokeWidth: 4,
  class: 'provider-class',
});
</script>

<template>
  <House v-bind="props" />
</template>
