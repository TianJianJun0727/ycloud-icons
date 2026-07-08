import { h, type JSX } from 'preact';
import { forwardRef } from 'preact/compat';
import { mergeClasses, toKebabCase, toPascalCase } from '@ycloud-web/shared';
import Icon from './Icon';
import type { IconNode, YCloudIcon, YCloudIconsProps } from './types';

/**
 * Create a YCloud icon component
 * @param {string} iconName
 * @param {array} iconNode
 * @returns {FunctionComponent} YCloudIcon
 */
const createYCloudIcon = (iconName: string, iconNode: IconNode): YCloudIcon => {
  const Component = forwardRef<SVGSVGElement, YCloudIconsProps>(
    ({ class: classes = '', className = '', children, ...props }, ref) =>
      h(
        Icon,
        {
          ...props,
          ref,
          iconNode,
          class: mergeClasses<string | JSX.SignalLike<string | undefined>>(
            `ycloud-${toKebabCase(toPascalCase(iconName))}`,
            `ycloud-${toKebabCase(iconName)}`,
            classes,
            className,
          ),
        },
        children,
      ),
  );

  Component.displayName = toPascalCase(iconName);

  return Component as YCloudIcon;
};

export default createYCloudIcon;
