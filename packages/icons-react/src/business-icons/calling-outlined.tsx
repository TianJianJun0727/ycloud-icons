import { forwardRef } from 'react';
import type { BusinessIconImageProps } from '../businessTypes';

const CallingOutlined = forwardRef<SVGSVGElement, BusinessIconImageProps>(
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
      <g transform="translate(-6.131349 -5.114668) scale(1.454303)">
        <g>
          <g>
            <path
              d="M7.00006 5.2C8.10006 4.6 9.50006 4.9 10.3001 5.9C10.9001 6.7 10.8001 7.7 10.2001 8.5C9.80006 9 9.90006 9.6 10.4001 10.4C11.1001 11.5 12.0001 12.5 13.1001 13.4C13.9001 14.1 14.6001 14.3 15.2001 14C16.1001 13.5 17.1001 13.5 17.9001 14.1C19.0001 14.9 19.4001 16.3 18.8001 17.4C18.1001 18.6 16.6001 19 15.4001 18.3C10.5001 15.6 7.00006 11.2 5.90006 6.9C5.70006 6.2 6.20006 5.6 7.00006 5.2Z"
              stroke="currentColor"
              strokeWidth={strokeWidth ?? '1.5'}
              strokeLinejoin="round"
            />
          </g>
        </g>
      </g>
    </svg>
  ),
);

CallingOutlined.displayName = 'CallingOutlined';

export default CallingOutlined;
