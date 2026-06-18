import { createContext, splitProps, type JSXElement } from 'solid-js';

export const YCloudContext = createContext<{
  size?: number;
  color?: string;
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
  class?: string;
}>({
  size: 24,
  color: 'currentColor',
  strokeWidth: 2,
  absoluteStrokeWidth: false,
  class: '',
});

interface YCloudProviderProps {
  children: JSXElement;
  size?: number;
  color?: string;
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
  class?: string;
}

export function YCloudProvider(props: YCloudProviderProps) {
  const [value, rest] = splitProps(props, [
    'size',
    'color',
    'strokeWidth',
    'absoluteStrokeWidth',
    'class',
  ]);

  return <YCloudContext.Provider value={value}>{rest.children}</YCloudContext.Provider>;
}
