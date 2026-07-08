import defaultAttributes from './defaultAttributes';
import { IconData, IconNode, SVGProps } from './types';

type CreateSVGElementParams = [tag: string, attrs: SVGProps, children?: IconNode[]];

/**
 * Creates a new SVGElement
 * @param {string} tag - Tag name of the element
 * @param {object} attrs - Attributes of the element
 * @param {array} children - Children of the element
 * @returns {SVGElement}
 */
const createSVGElement = ([tag, attrs, children]: CreateSVGElementParams) => {
  // Check if document is available (browser environment)
  if (typeof document === 'undefined') {
    throw new Error(
      'createElement can only be used in browser environment. ' +
        'For SSR, use framework-specific packages (@ycloud-web/icons-react, @ycloud-web/icons-vue, etc.)',
    );
  }

  const element = document.createElementNS('http://www.w3.org/2000/svg', tag);

  Object.keys(attrs).forEach((name) => {
    const value = attrs[name];
    // Skip undefined and null values to avoid "undefined" strings
    if (value !== undefined && value !== null) {
      element.setAttribute(name, String(value));
    }
  });

  if (children && children.length) {
    children.forEach((child) => {
      const childElement = createSVGElement(child);

      element.appendChild(childElement);
    });
  }

  return element;
};

/**
 * Creates a new HTMLElement from icon node
 * @param {array} iconNode - Icon node to be converted to an element
 * @param {object} customAttrs - Custom attributes to be added to the element
 * @returns {HTMLElement}
 */
const createElement = (icon: IconData, customAttrs: SVGProps = {}) => {
  const tag = 'svg';
  const attrs = {
    ...defaultAttributes,
    ...icon.attrs,
    ...customAttrs,
  };

  return createSVGElement([tag, attrs, icon.node]);
};

export default createElement;
