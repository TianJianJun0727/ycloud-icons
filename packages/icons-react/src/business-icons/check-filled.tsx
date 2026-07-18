import { forwardRef } from 'react';
import type { BusinessIconImageProps } from '../businessTypes';

type CheckFilledProps = BusinessIconImageProps & {
  secondaryColor?: string;
};

const CheckFilled = forwardRef<SVGSVGElement, CheckFilledProps>(
  (
    {
      size = 24,
      width,
      height,
      alt = '',
      color = 'currentColor',
      secondaryColor = '#fff',
      strokeWidth,
      style,
      ...props
    },
    ref,
  ) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={color}
      strokeWidth={strokeWidth}
      width={width ?? size}
      height={height ?? size}
      role={alt ? 'img' : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      style={{ color, ...style }}
      {...props}
    >
      <g transform="translate(-2.1 -2.1) scale(1.175)">
        <path
          d="M0 0h24v24H0V0z"
          fill="none"
        />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.29 16.29 5.7 12.7c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L10 14.17l6.88-6.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-7.59 7.59c-.38.39-1.02.39-1.41 0z" />
      </g>
    </svg>
  ),
);

CheckFilled.displayName = 'CheckFilled';

export default CheckFilled;
