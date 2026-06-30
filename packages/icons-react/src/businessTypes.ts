import type { SVGProps } from 'react';

export interface BusinessIconImageProps extends Omit<
  SVGProps<SVGSVGElement>,
  'color' | 'width' | 'height'
> {
  size?: number | string;
  width?: number | string;
  height?: number | string;
  alt?: string;
  color?: string;
}
