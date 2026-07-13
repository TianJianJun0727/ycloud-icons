import { forwardRef } from 'react';
import type { IllustrationProps } from '../illustrationTypes';

const DeveloperIntegration = forwardRef<SVGSVGElement, IllustrationProps>(
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
        d="M16.7607 4.6543C23.3882 4.6543 28.7607 10.0269 28.7607 16.6543C28.7607 23.2817 23.3882 28.6543 16.7607 28.6543C10.1333 28.6543 4.76074 23.2817 4.76074 16.6543C4.76074 10.0269 10.1333 4.6543 16.7607 4.6543ZM18.4961 12.0088C18.21 11.9019 17.7615 12.0531 17.6709 12.293H17.6689L14.623 20.6191C14.5307 20.8573 14.8098 21.2122 15.0664 21.3008C15.3083 21.3911 15.7405 21.2946 15.8291 21.0547L18.8564 12.7285C18.93 12.4885 18.7692 12.1103 18.4961 12.0088ZM21.0938 12.96C20.9128 12.7809 20.4679 12.7292 20.2334 12.96C19.9936 13.1982 20.0525 13.6763 20.2334 13.8701L23.0586 16.6133L20.3223 19.1553C20.1432 19.3343 20.062 19.8665 20.3223 20.125C20.5991 20.396 21.0769 20.291 21.2451 20.125L24.4277 16.9473C24.5141 16.8602 24.5634 16.7427 24.5635 16.6201C24.5635 16.4974 24.5142 16.3791 24.4277 16.292L21.0938 12.958V12.96ZM13.2646 12.958C13.0487 12.7144 12.6058 12.7791 12.4248 12.958V12.96L9.08984 16.2939C9.00362 16.381 8.9552 16.4986 8.95508 16.6211C8.95508 16.7438 9.00349 16.8621 9.08984 16.9492L12.2744 20.123C12.4424 20.291 12.9489 20.3295 13.1963 20.084C13.401 19.8809 13.3771 19.3696 13.1963 19.1904L10.4707 16.6094L13.2646 13.8955C13.4454 13.7016 13.532 13.2404 13.2646 12.958Z"
        fill="url(#paint0_linear_26070_11628)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_26070_11628"
          x1="17.9893"
          y1="16.6543"
          x2="28.7607"
          y2="16.6543"
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

DeveloperIntegration.displayName = 'DeveloperIntegration';

export default DeveloperIntegration;
