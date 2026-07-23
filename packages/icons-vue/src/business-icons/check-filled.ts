import { h, type FunctionalComponent } from 'vue';
import type { BusinessIconImageProps } from '../businessTypes';

const CheckFilled: FunctionalComponent<BusinessIconImageProps> = ({
  size = 24,
  width,
  height,
  alt = '',
  color = 'currentColor',
  strokeWidth,
  style,
  ...props
}) =>
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
          transform: 'translate(-2.1 -2.1) scale(1.175)',
        },
        [
          h('path', {
            d: 'M0 0h24v24H0V0z',
            fill: 'none',
          }),
          h('path', {
            d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.29 16.29 5.7 12.7c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L10 14.17l6.88-6.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-7.59 7.59c-.38.39-1.02.39-1.41 0z',
          }),
        ],
      ),
    ],
  );

export default CheckFilled;
