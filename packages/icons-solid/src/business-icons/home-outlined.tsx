import type { BusinessIconImageProps } from '../businessTypes';

const HomeOutlined = ({
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
    <g transform="translate(-2.117652 -2.117652) scale(1.176471)">
      <g>
        <g>
          <path
            d="M4 10.5L12 3.5L20 10.5V18.5C20 19.0304 19.7893 19.5391 19.4142 19.9142C19.0391 20.2893 18.5304 20.5 18 20.5H6C5.46957 20.5 4.96086 20.2893 4.58579 19.9142C4.21071 19.5391 4 19.0304 4 18.5V10.5Z"
            stroke="currentColor"
            stroke-width={strokeWidth ?? '1.5'}
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9 15.5H15"
            stroke="currentColor"
            stroke-width={strokeWidth ?? '1.5'}
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </g>
    </g>
  </svg>
);

export default HomeOutlined;
