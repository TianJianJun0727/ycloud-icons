import type { BusinessIconImageProps } from '../businessTypes';

type WarningFilledProps = BusinessIconImageProps & {
  secondaryColor?: string;
};

const WarningFilled = ({
  size = 24,
  width,
  height,
  alt = '',
  color = 'currentColor',
  strokeWidth,
  style,
  ...props
}: WarningFilledProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={color}
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
    <g transform="translate(-2.793252 -3.405015) scale(1.232771)">
      <path d="M4.47 21h15.06c1.54 0 2.5-1.67 1.73-3L13.73 4.99c-.77-1.33-2.69-1.33-3.46 0L2.74 18c-.77 1.33.19 3 1.73 3zM12 14c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1s1 .45 1 1v2c0 .55-.45 1-1 1zm1 4h-2v-2h2v2z" />
    </g>
  </svg>
);

export default WarningFilled;
