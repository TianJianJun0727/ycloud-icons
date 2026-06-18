<script lang="ts">
  import Smile from '../src/icons/smile.svelte';
  import { setYCloudProps } from '../src/ycloud-svelte.js';

  setYCloudProps({
    size: 32,
    color: 'red',
    strokeWidth: 1,
    class: 'provider-class',
  });
</script>

<Smile aria-label="smile">
  <text>Test</text>
</Smile>
