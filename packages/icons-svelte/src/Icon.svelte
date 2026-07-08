<script lang="ts">
  import defaultAttributes from './defaultAttributes.js';
  import type { IconProps } from './types.js';
  import { hasA11yProp } from './utils/hasA11yProp.js';
  import { getYCloudContext } from './context.js';

  const globalProps = getYCloudContext() ?? {};

  const {
    name,
    color = globalProps.color ?? 'currentColor',
    size = globalProps.size ?? 24,
    strokeWidth = globalProps.strokeWidth ?? 2,
    absoluteStrokeWidth = globalProps.absoluteStrokeWidth ?? false,
    iconNode = [],
    children,
    ...props
  }: IconProps = $props();

  const numericSize = $derived(Number(size));
  const safeSize = $derived(Number.isFinite(numericSize) ? Math.max(numericSize, 1) : 24);
  const numericStrokeWidth = $derived(Number(strokeWidth));
  const safeStrokeWidth = $derived(Number.isFinite(numericStrokeWidth) ? numericStrokeWidth : 2);
  const calculatedStrokeWidth = $derived(
    absoluteStrokeWidth ? (safeStrokeWidth * 24) / safeSize : strokeWidth,
  );
</script>

<svg
  {...defaultAttributes}
  {...!children && !hasA11yProp(props) && { 'aria-hidden': 'true' }}
  {...props}
  width={size}
  height={size}
  stroke={color}
  stroke-width={calculatedStrokeWidth}
  class={['ycloud-icon ycloud', globalProps.class, name && `ycloud-${name}`, props.class]}
>
  {#each iconNode as [tag, attrs]}
    <svelte:element
      this={tag as string}
      {...attrs}
    />
  {/each}
  {@render children?.()}
</svg>
