import { forwardRef } from 'react';
import type { IllustrationProps } from '../illustrationTypes';

const Email = forwardRef<SVGSVGElement, IllustrationProps>(
  ({ width = '100%', height = 'auto', alt = '', ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      width={width}
      height={height}
      role={alt ? 'img' : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      {...props}
    >
      <path
        d="M4.44439 24.9332C3.75755 24.9326 3.20086 24.3763 3.19986 23.6896V8.04351C3.20088 7.35665 3.75778 6.80019 4.44469 6.79986H27.2629L17.0133 16.1264C16.5267 16.6117 15.7374 16.6108 15.1884 16.0666L7.04583 9.17519C6.86121 9.01802 6.61996 8.92239 6.35636 8.92239C5.76726 8.92239 5.28974 9.39996 5.28974 9.98901C5.28974 10.3145 5.43554 10.606 5.66544 10.8016L13.7435 17.6349C14.3565 18.2484 15.2038 18.628 16.1396 18.628C16.1414 18.628 16.1432 18.628 16.145 18.628C16.999 18.628 17.8493 18.3069 18.4839 17.6702L28.7999 8.28454V23.6895C28.7989 24.3765 28.2418 24.933 27.5548 24.9332H4.44476H4.44439ZM27.5553 4.6665H4.44436C2.58249 4.6665 1.06641 6.18105 1.06641 8.04351V23.6895C1.06641 25.552 2.58214 27.0665 4.44436 27.0665H27.5553C29.4172 27.0665 30.9332 25.552 30.9332 23.6895V8.04351C30.9332 6.18102 29.4175 4.6665 27.5553 4.6665Z"
        fill="url(#paint0_linear_26068_11018)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_26068_11018"
          x1="17.5287"
          y1="15.8665"
          x2="30.9332"
          y2="15.8665"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6236FF" />
          <stop
            offset="1"
            stopColor="#A560FF"
          />
        </linearGradient>
      </defs>
    </svg>
  ),
);

Email.displayName = 'Email';

export default Email;
