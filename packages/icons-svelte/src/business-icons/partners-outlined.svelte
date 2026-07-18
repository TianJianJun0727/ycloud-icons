<script lang="ts">
  import type { BusinessIconImageProps } from '../businessTypes.js';
  const { size = 24, width, height, alt = '', color = 'currentColor', strokeWidth, style, ...props }: BusinessIconImageProps = $props();
</script>

<svg
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  stroke-width={strokeWidth}
  width={width ?? size}
  height={height ?? size}
  role={alt ? 'img' : undefined}
  aria-label={alt || undefined}
  aria-hidden={alt ? undefined : true}
  color={color}
  style={style}
  {...props}
>
  <g transform="translate(-0.584406 -0.828085) scale(1.048711)">
    <g>
      <g>
        <path d="M11.9999 9.50001L8.49989 6.00001C7.83685 5.33697 6.93757 4.96448 5.99989 4.96448C5.06221 4.96448 4.16293 5.33697 3.49989 6.00001C2.83685 6.66305 2.46436 7.56233 2.46436 8.50001C2.46436 9.43769 2.83685 10.337 3.49989 11L11.9999 19.5L20.4999 11C21.1629 10.337 21.5354 9.43769 21.5354 8.50001C21.5354 7.56233 21.1629 6.66305 20.4999 6.00001C19.8368 5.33697 18.9376 4.96448 17.9999 4.96448C17.0622 4.96448 16.1629 5.33697 15.4999 6.00001L11.9999 9.50001Z" stroke="currentColor" stroke-width={strokeWidth ?? "1.5"} stroke-linecap="round" stroke-linejoin="round" />
        <path d="M10.0769 11.077L14.4999 15.5" stroke="currentColor" stroke-width={strokeWidth ?? "1.5"} stroke-linecap="round" stroke-linejoin="round" />
      </g>
    </g>
  </g>
</svg>
