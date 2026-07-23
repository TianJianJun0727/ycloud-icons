import { h, type FunctionalComponent } from 'vue';
import type { BusinessIconImageProps } from '../businessTypes';

const InfoFilled: FunctionalComponent<BusinessIconImageProps> = ({
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
            d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1-8h-2V7h2v2z',
          }),
        ],
      ),
    ],
  );

export default InfoFilled;
