import { getContext, setContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';

const YCloudContext = Symbol('ycloud-context');

export interface YCloudGlobalContext {
  color?: string;
  size?: number;
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
  class?: string;
}

export type YCloudGlobalContextStore = Writable<YCloudGlobalContext>;

export const setYCloudIconsProps = (globalProps: YCloudGlobalContext) => {
  const globalPropsStore = writable(globalProps);
  setContext(YCloudContext, globalPropsStore);
  return globalPropsStore;
};

export const getYCloudContext = () => getContext<YCloudGlobalContextStore>(YCloudContext);
