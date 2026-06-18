import { type FunctionComponent, type JSX } from 'preact';

export type IconNode = [elementName: keyof JSX.IntrinsicElements, attrs: Record<string, string>][];

export interface YCloudProps extends Partial<Omit<JSX.SVGAttributes, 'ref' | 'size'>> {
  color?: string;
  size?: string | number;
  strokeWidth?: string | number;
  absoluteStrokeWidth?: boolean;
}

export type YCloudIcon = FunctionComponent<YCloudProps>;
