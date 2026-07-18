import { forwardRef } from 'react';
import type { BusinessIconImageProps } from '../businessTypes';

const OrderOutlined = forwardRef<SVGSVGElement, BusinessIconImageProps>(
  (
    { size = 24, width, height, alt = '', color = 'currentColor', strokeWidth, style, ...props },
    ref,
  ) => (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth={strokeWidth}
      width={width ?? size}
      height={height ?? size}
      role={alt ? 'img' : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      style={{ color, ...style }}
      {...props}
    >
      <g transform="translate(-1.333332 -1.333332) scale(1.111111)">
        <g>
          <g>
            <path
              d="M19 5.5H5C3.89543 5.5 3 6.39543 3 7.5V16.5C3 17.6046 3.89543 18.5 5 18.5H19C20.1046 18.5 21 17.6046 21 16.5V7.5C21 6.39543 20.1046 5.5 19 5.5Z"
              stroke="currentColor"
              strokeWidth={strokeWidth ?? '1.5'}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 9.5H21"
              stroke="currentColor"
              strokeWidth={strokeWidth ?? '1.5'}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.5 15H18"
              stroke="currentColor"
              strokeWidth={strokeWidth ?? '1.5'}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </g>
    </svg>
  ),
);

OrderOutlined.displayName = 'OrderOutlined';

export default OrderOutlined;
