import { computed, type FunctionalComponent, h } from 'vue';
import {
  isEmptyString,
  mergeClasses,
  toKebabCase,
  toPascalCase,
  hasA11yProp,
} from '@ycloud-web/shared';
import defaultAttributes from './defaultAttributes';
import { IconNode, YCloudIconsProps } from './types';
import { useYCloudIconsProps } from './context';

type IconProps = { name: string } & (
  | { iconNode: IconNode; 'icon-node'?: never }
  | { 'icon-node': IconNode; iconNode?: never }
);

const Icon: FunctionalComponent<YCloudIconsProps & IconProps> = (
  {
    name,
    iconNode,
    'icon-node': iconNodeKebabCase,
    absoluteStrokeWidth,
    'absolute-stroke-width': absoluteStrokeWidthKebabCase,
    strokeWidth,
    'stroke-width': strokeWidthKebabCase,
    size,
    color,
    ...props
  },
  { slots },
) => {
  const {
    size: contextSize,
    color: contextColor,
    strokeWidth: contextStrokeWidth = 2,
    absoluteStrokeWidth: contextAbsoluteStrokeWidth = false,
    class: contextClass = '',
  } = useYCloudIconsProps();

  const calculatedStrokeWidth = computed(() => {
    const isAbsoluteStrokeWidth =
      isEmptyString(absoluteStrokeWidth) ||
      isEmptyString(absoluteStrokeWidthKebabCase) ||
      absoluteStrokeWidth === true ||
      absoluteStrokeWidthKebabCase === true ||
      contextAbsoluteStrokeWidth === true;

    const strokeWidthValue =
      strokeWidth ||
      strokeWidthKebabCase ||
      contextStrokeWidth ||
      defaultAttributes['stroke-width'];

    if (isAbsoluteStrokeWidth) {
      return (
        (Number(strokeWidthValue) * 24) / Number(size ?? contextSize ?? defaultAttributes.width)
      );
    }

    return strokeWidthValue;
  });

  return h(
    'svg',
    {
      ...defaultAttributes,
      ...props,
      width: size ?? contextSize ?? defaultAttributes.width,
      height: size ?? contextSize ?? defaultAttributes.height,
      stroke: color ?? contextColor ?? defaultAttributes.stroke,
      'stroke-width': calculatedStrokeWidth.value,
      ...(!slots.default && !hasA11yProp(props) && { 'aria-hidden': 'true' }),
      class: mergeClasses(
        'ycloud',
        contextClass,
        ...(name
          ? [`ycloud-${toKebabCase(toPascalCase(name))}-icon`, `ycloud-${toKebabCase(name)}`]
          : ['ycloud-icon']),
      ),
    },
    [
      ...(iconNode ?? iconNodeKebabCase ?? []).map((child) => h(...child)),
      ...(slots.default ? [slots.default()] : []),
    ],
  );
};

export default Icon;
