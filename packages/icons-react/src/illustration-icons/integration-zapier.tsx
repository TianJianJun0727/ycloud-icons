import { forwardRef } from 'react';
import type { IllustrationProps } from '../illustrationTypes';

const IntegrationZapier = forwardRef<SVGSVGElement, IllustrationProps>(
  ({ width = '100%', height = 'auto', alt = '', ...props }, ref) => (
    <svg
      ref={ref}
      viewBox="0 0 105 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width}
      height={height}
      role={alt ? 'img' : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      {...props}
    >
      <rect
        y="0.556641"
        width="104.117"
        height="28"
        fill="url(#pattern0_19972_8410)"
      />
      <defs>
        <pattern
          id="pattern0_19972_8410"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_19972_8410"
            transform="scale(0.00261097 0.00970874)"
          />
        </pattern>
        <image
          id="image0_19972_8410"
          width="383"
          height="103"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  ),
);

IntegrationZapier.displayName = 'IntegrationZapier';

export default IntegrationZapier;
