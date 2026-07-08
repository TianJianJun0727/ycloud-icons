import { describe, expect, it } from 'vitest';
import { configureAxe, toHaveNoViolations } from 'vitest-axe';
import { render } from '@testing-library/react';
import { House } from '../src/icons/house';

// Extend Vitest with axe matchers
expect.extend(toHaveNoViolations);

const axe = configureAxe({
  rules: {
    // Icons should have proper accessibility
    'svg-img-alt': { enabled: true },
  },
});

describe('Icon Accessibility', () => {
  it('should have no a11y violations with aria-hidden', async () => {
    const { container } = render(<House />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no a11y violations with aria-label', async () => {
    const { container } = render(<House aria-label="Home" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no a11y violations with role and aria-label', async () => {
    const { container } = render(<House role="img" aria-label="Go to home page" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should auto-add aria-hidden when no a11y props provided', () => {
    const { container } = render(<House />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('aria-hidden')).toBe('true');
  });

  it('should not add aria-hidden when aria-label is provided', () => {
    const { container } = render(<House aria-label="Home" />);
    const svg = container.querySelector('svg');
    expect(svg?.hasAttribute('aria-hidden')).toBe(false);
  });
});
