import { h } from 'preact';
import type { BusinessIconImageProps } from '../businessTypes';

type BenefitStatisticalFilledProps = BusinessIconImageProps & {
  secondaryColor?: string;
};

const BenefitStatisticalFilled = ({
  size = 24,
  width,
  height,
  alt = '',
  color = 'currentColor',
  strokeWidth,
  style,
  ...props
}: BenefitStatisticalFilledProps) =>
  h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 24 24',
      fill: color,
      width: width ?? size,
      height: height ?? size,
      role: alt ? 'img' : undefined,
      'aria-label': alt || undefined,
      'aria-hidden': alt ? undefined : true,
      color,
      'stroke-width': strokeWidth,
      style,
      ...props,
    },
    [
      h(
        'g',
        {
          transform: 'translate(-0.241927 0.500008) scale(0.741935)',
        },
        [
          h('path', {
            d: 'M32 14V13.9751C32 6.25497 25.7297 0 18 0V14H32Z',
          }),
          h('path', {
            d: 'M15.5 16.5258V2C7.4899 2 1 8.49421 1 16.5V16.5258C1.01292 24.523 7.49852 31 15.5 31C23.5015 31 29.9871 24.523 30 16.5258H15.5Z',
          }),
        ],
      ),
    ],
  );

export default BenefitStatisticalFilled;
