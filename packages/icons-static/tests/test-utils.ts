import { configureAxe, toHaveNoViolations } from 'vitest-axe';
import { expect } from 'vitest';

// Extend Vitest matchers with axe-core
expect.extend(toHaveNoViolations);

/**
 * Configure axe-core with YCloud Icons specific rules
 * @returns Configured axe instance
 */
export const configureYCloudAxe = () => {
  return configureAxe({
    rules: {
      // Icons without children should have aria-hidden
      // This is handled by our components
      'svg-img-alt': { enabled: true },
      'image-alt': { enabled: true },
    },
  });
};

/**
 * Test icon accessibility with axe-core
 * @param html - HTML string to test
 * @returns Axe results
 */
export const testIconA11y = async (html: string) => {
  const axe = configureYCloudAxe();
  const { container } = render(html);
  return await axe(container);
};

/**
 * Simple HTML renderer for testing
 * @param html - HTML string
 * @returns Object with container
 */
function render(html: string) {
  if (typeof document === 'undefined') {
    throw new Error('testIconA11y requires a browser environment');
  }

  const container = document.createElement('div');
  container.innerHTML = html;
  document.body.appendChild(container);

  return {
    container,
    cleanup: () => {
      document.body.removeChild(container);
    },
  };
}

export { render };
