<script lang="ts">
  import Smile from '../src/icons/smile.svelte';
  import { setYCloudIconsProps } from '../src/icons.js';

  let { size = 32, color = 'red' } = $props<{
    size?: number;
    color?: string;
  }>();

  const iconProps = setYCloudIconsProps({
    size: 32,
    color: 'red',
    strokeWidth: 1,
    class: 'provider-class',
  });

  $effect(() => {
    iconProps.set({
      size,
      color,
      strokeWidth: 1,
      class: 'provider-class',
    });
  });
</script>

<Smile aria-label="smile" />
