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
  <g transform="translate(-1.333332 -1.055554) scale(1.111111)">
    <g>
      <g>
        <path d="M17.5 4.5H6.5C4.567 4.5 3 6.067 3 8V13C3 14.933 4.567 16.5 6.5 16.5H17.5C19.433 16.5 21 14.933 21 13V8C21 6.067 19.433 4.5 17.5 4.5Z" stroke="currentColor" stroke-width={strokeWidth ?? "1.5"} stroke-linecap="round" stroke-linejoin="round" />
        <path d="M9.1543 7.44336C9.41957 7.44318 9.65859 7.60457 9.75781 7.85059L11.2549 11.5654C11.2568 11.5699 11.2589 11.5746 11.2607 11.5791L11.7002 12.668C11.8343 13.0008 11.6736 13.3794 11.3408 13.5137C11.008 13.6478 10.6295 13.487 10.4951 13.1543L10.2207 12.4746H8.0957L7.82324 13.1533C7.68937 13.4862 7.3105 13.6482 6.97754 13.5146C6.64454 13.3809 6.48265 13.002 6.61621 12.6689L8.55176 7.85156L8.59473 7.76367C8.71017 7.56764 8.92205 7.44357 9.1543 7.44336ZM14.4629 7.48047C15.2411 7.48054 15.98 7.8083 16.5186 8.37793C17.056 8.94649 17.3515 9.71085 17.3516 10.5C17.3515 11.289 17.0558 12.0526 16.5186 12.6211C15.98 13.1909 15.2412 13.5185 14.4629 13.5186H13.1191C12.7604 13.5184 12.4689 13.2279 12.4688 12.8691V8.13086C12.4689 7.77205 12.7603 7.48057 13.1191 7.48047H14.4629ZM13.7695 12.2188H14.4629C14.872 12.2187 15.2721 12.047 15.5732 11.7285C15.8756 11.4086 16.0517 10.9673 16.0518 10.5C16.0517 10.0327 15.8756 9.59135 15.5732 9.27148C15.2721 8.95302 14.872 8.78132 14.4629 8.78125H13.7695V12.2188ZM8.61816 11.1748H9.69629L9.15527 9.83398L8.61816 11.1748Z" fill="currentColor" />
        <path d="M6.5 19H17.5" stroke="currentColor" stroke-width={strokeWidth ?? "1.5"} stroke-linecap="round" stroke-linejoin="round" />
      </g>
    </g>
  </g>
</svg>
