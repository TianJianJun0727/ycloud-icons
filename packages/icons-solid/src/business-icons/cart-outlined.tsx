import type { BusinessIconImageProps } from '../businessTypes';

const CartOutlined = ({
  size = 24,
  width,
  height,
  alt = '',
  color = 'currentColor',
  strokeWidth,
  style,
  ...props
}: BusinessIconImageProps) => (
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
    <g transform="translate(-1.529416 -1.882358) scale(1.176471)">
      <g>
        <g>
          <path
            d="M3 4H5L6.5 15H18L20 7.5H6"
            stroke="currentColor"
            stroke-width={strokeWidth ?? '1.5'}
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7.9999 19.6C8.88356 19.6 9.5999 18.8837 9.5999 18C9.5999 17.1164 8.88356 16.4 7.9999 16.4C7.11625 16.4 6.3999 17.1164 6.3999 18C6.3999 18.8837 7.11625 19.6 7.9999 19.6Z"
            fill="currentColor"
          />
          <path
            d="M16.9999 19.6C17.8836 19.6 18.5999 18.8837 18.5999 18C18.5999 17.1164 17.8836 16.4 16.9999 16.4C16.1162 16.4 15.3999 17.1164 15.3999 18C15.3999 18.8837 16.1162 19.6 16.9999 19.6Z"
            fill="currentColor"
          />
        </g>
      </g>
    </g>
  </svg>
);

export default CartOutlined;
