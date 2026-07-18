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
  <g transform="translate(-2.088494 -1.432682) scale(1.168141)">
    <g>
      <g>
        <path d="M12 3.50002C13.3802 3.48149 14.7445 3.77961 15.9749 4.36862C17.2052 4.95763 18.2647 5.81979 19.0616 6.88059C19.8585 7.94139 20.369 9.1689 20.5488 10.457C20.7286 11.7451 20.5724 13.0551 20.0937 14.2736C19.615 15.4922 18.8282 16.5827 17.8012 17.4508C16.7743 18.319 15.5382 18.9387 14.1997 19.2564C12.8612 19.574 11.4607 19.5801 10.1191 19.2741C8.7776 18.9681 7.53542 18.3592 6.5 17.5L3.5 18.5L4.6 15.2C3.92926 13.9903 3.59845 12.6391 3.63903 11.2751C3.6796 9.91108 4.09022 8.57949 4.83182 7.40695C5.57343 6.23441 6.62138 5.25989 7.87603 4.57606C9.13069 3.89222 10.5503 3.52181 12 3.50002Z" stroke="currentColor" stroke-width={strokeWidth ?? "1.5"} stroke-linecap="round" stroke-linejoin="round" />
        <path d="M8.5 13.5C8.79084 14.0431 9.27793 14.5064 9.90042 14.8322C10.5229 15.1579 11.2532 15.3317 12 15.3317C12.7468 15.3317 13.4771 15.1579 14.0996 14.8322C14.7221 14.5064 15.2092 14.0431 15.5 13.5" stroke="currentColor" stroke-width={strokeWidth ?? "1.5"} stroke-linecap="round" stroke-linejoin="round" />
      </g>
    </g>
  </g>
</svg>
