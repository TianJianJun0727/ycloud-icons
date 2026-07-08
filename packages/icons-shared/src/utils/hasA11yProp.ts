/**
 * Check if a component has an accessibility prop
 *
 * @param {object} props
 * @returns {boolean} Whether the component has an accessibility prop
 */
export const hasA11yProp = (props: Record<string, any>) => {
  for (const prop in props) {
    // Only check own properties to avoid prototype chain pollution
    if (Object.prototype.hasOwnProperty.call(props, prop)) {
      const value = props[prop];
      // Check if it's an a11y prop with a non-empty value
      if (
        (prop.startsWith('aria-') || prop === 'role' || prop === 'title') &&
        value !== '' &&
        value !== null &&
        value !== undefined
      ) {
        return true;
      }
    }
  }

  return false;
};
