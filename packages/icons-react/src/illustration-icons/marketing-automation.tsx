import { forwardRef } from 'react';
import type { IllustrationProps } from '../illustrationTypes';

const MarketingAutomation = forwardRef<SVGSVGElement, IllustrationProps>(
  ({ width = '100%', height = 'auto', alt = '', ...props }, ref) => (
    <svg
      ref={ref}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      role={alt ? 'img' : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.5284 8.18971C19.5284 10.0684 18.2544 11.6496 16.5233 12.1164V14.249H19.9836C22.2405 14.249 24.0703 16.0781 24.0705 18.335V19.7732C26.0836 20.0168 27.6434 21.7313 27.6434 23.8102C27.6434 26.0561 25.8227 27.8768 23.5768 27.8768C21.3308 27.8768 19.5101 26.0561 19.5101 23.8102C19.5101 21.9965 20.6974 20.4601 22.3371 19.9359V18.335C22.3369 17.0354 21.2832 15.9814 19.9836 15.9814H11.465C10.1656 15.9817 9.11173 17.0355 9.11151 18.335V19.8015C11.0296 20.1286 12.4898 21.7988 12.4898 23.8102C12.4898 26.0561 10.6691 27.8768 8.42311 27.8768C6.17715 27.8768 4.35645 26.0561 4.35645 23.8102C4.35645 21.9251 5.639 20.3396 7.37909 19.8788V18.335C7.3793 16.0782 9.20827 14.2492 11.465 14.249H14.7909V12.2013C12.8641 11.8815 11.395 10.2072 11.395 8.18971C11.395 5.94376 13.2157 4.12305 15.4617 4.12305C17.7077 4.12305 19.5284 5.94376 19.5284 8.18971Z"
        fill="url(#paint0_linear_26070_11638)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_26070_11638"
          x1="17.192"
          y1="15.9999"
          x2="27.6434"
          y2="15.9999"
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

MarketingAutomation.displayName = 'MarketingAutomation';

export default MarketingAutomation;
