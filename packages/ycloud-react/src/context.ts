'use client';

import { createContext, createElement, type ReactNode, useContext, useMemo } from 'react';
import { YCloudProps } from './types';

type YCloudConfig = {
  size: number;
  color: string;
  strokeWidth: number;
  absoluteStrokeWidth: boolean;
  className: string;
};

const YCloudContext = createContext<YCloudProps>({});

type YCloudProviderProps = {
  children: ReactNode;
} & Partial<YCloudConfig>;

export function YCloudProvider({
  children,
  size,
  color,
  strokeWidth,
  absoluteStrokeWidth,
  className,
}: YCloudProviderProps) {
  const value = useMemo(
    () => ({
      size,
      color,
      strokeWidth,
      absoluteStrokeWidth,
      className,
    }),
    [size, color, strokeWidth, absoluteStrokeWidth, className],
  );

  return createElement(YCloudContext.Provider, { value }, children);
}

export const useYCloudContext = () => useContext(YCloudContext);
