import { forwardRef } from 'react';
import type { BusinessIconImageProps } from '../businessTypes';

type ErrorFilledProps = BusinessIconImageProps & {
  secondaryColor?: string;
};

const ErrorFilled = forwardRef<SVGSVGElement, ErrorFilledProps>(
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
          opacity=".87"
        />
        <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm4.3 14.3c-.39.39-1.02.39-1.41 0L12 13.41 9.11 16.3c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41L10.59 12 7.7 9.11c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L12 10.59l2.89-2.89c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41z" />
      </g>
    </svg>
  ),
);

ErrorFilled.displayName = 'ErrorFilled';

export default ErrorFilled;
