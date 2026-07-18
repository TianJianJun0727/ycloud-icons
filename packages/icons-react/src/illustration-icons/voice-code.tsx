import { forwardRef } from 'react';
import type { IllustrationProps } from '../illustrationTypes';

const VoiceCode = forwardRef<SVGSVGElement, IllustrationProps>(
  ({ width = '100%', height = 'auto', alt = '', ...props }, ref) => (
    <svg
      ref={ref}
      viewBox="0 0 34 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      role={alt ? 'img' : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      {...props}
    >
      <g>
        <path
          d="M28.4631 24.5475C27.7942 26.2814 26.143 27.4172 24.3249 27.5354V27.5566C12.9543 27.5566 5.3125 20.4025 5.3125 9.61694H5.34524C5.49259 7.92415 6.6854 6.39206 8.50189 5.76837C10.9686 4.92161 11.9096 6.73546 12.8077 9.06295C13.7058 11.3904 14.2204 13.3503 11.7537 14.1978C11.4707 14.2947 11.1838 14.357 10.8953 14.4003C11.9033 18.3113 15.1684 21.3608 19.3136 22.297C19.3603 22.0234 19.4274 21.7497 19.5303 21.4804C20.4276 19.1529 22.5053 19.6386 24.972 20.4861C27.4387 21.3336 29.3604 22.22 28.4631 24.5475Z"
          fill="#861BFF"
        />
      </g>
    </svg>
  ),
);

VoiceCode.displayName = 'VoiceCode';

export default VoiceCode;
