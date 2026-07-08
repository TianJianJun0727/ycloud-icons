<script lang="ts">
  import defaultAttributes from './defaultAttributes.js';
  import type { IconProps } from './types.js';
  import { hasA11yProp } from './utils/hasA11yProp.js';
  import { getYCloudContext } from './context.js';
  import { readable } from 'svelte/store';

  const globalProps = getYCloudContext() ?? readable({});

  let {
    name,
    color,
    size,
    strokeWidth,
    absoluteStrokeWidth,
    iconNode = [],
    children,
    ...props
  }: IconProps = $props();

  const resolvedColor = $derived(color ?? $globalProps.color ?? 'currentColor');
  const resolvedSize = $derived(size ?? $globalProps.size ?? 24);
  const resolvedStrokeWidth = $derived(strokeWidth ?? $globalProps.strokeWidth ?? 2);
  const resolvedAbsoluteStrokeWidth = $derived(
    absoluteStrokeWidth ?? $globalProps.absoluteStrokeWidth ?? false,
  );
  const numericSize = $derived(Number(resolvedSize));
  const safeSize = $derived(Number.isFinite(numericSize) ? Math.max(numericSize, 1) : 24);
  const numericStrokeWidth = $derived(Number(resolvedStrokeWidth));
  const safeStrokeWidth = $derived(Number.isFinite(numericStrokeWidth) ? numericStrokeWidth : 2);
  const calculatedStrokeWidth = $derived(
    resolvedAbsoluteStrokeWidth ? (safeStrokeWidth * 24) / safeSize : resolvedStrokeWidth,
  );
</script>

<svg
  {...defaultAttributes}
  {...!children && !hasA11yProp(props) && { 'aria-hidden': 'true' }}
  {...props}
  width={resolvedSize}
  height={resolvedSize}
  stroke={resolvedColor}
  stroke-width={calculatedStrokeWidth}
  class={['ycloud-icon ycloud', $globalProps.class, name && `ycloud-${name}`, props.class]}
>
  {#each iconNode as [tag, attrs]}
    <svelte:element
      this={tag as string}
      {...attrs}
    />
  {/each}
  {@render children?.()}
</svg>
