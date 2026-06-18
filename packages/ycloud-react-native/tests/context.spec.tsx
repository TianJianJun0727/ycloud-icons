import { cleanup, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { House, YCloudProvider } from '../src/ycloud-react-native';

vi.mock('react-native-svg');

describe('Using YCloudProvider', () => {
  it('should render the icon with YCloudProvider', () => {
    cleanup();
    const { container } = render(
      <YCloudProvider>
        <House />
      </YCloudProvider>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render the icon with YCloudProvider and custom strokeWidth', () => {
    cleanup();
    const testId = 'house-icon';
    const { getByTestId } = render(
      <YCloudProvider
        size={48}
        color="red"
        strokeWidth={4}
      >
        <House testID={testId} />
      </YCloudProvider>,
    );

    const IconComponent = getByTestId(testId);

    expect(IconComponent).toHaveAttribute('width', '48');
    expect(IconComponent).toHaveAttribute('height', '48');
    expect(IconComponent).toHaveAttribute('stroke', 'red');
    expect(IconComponent).toHaveAttribute('stroke-width', '4');
  });

  it('should render the icon with YCloudProvider and custom absoluteStrokeWidth', () => {
    cleanup();
    const { container } = render(
      <YCloudProvider
        size={48}
        color="red"
        absoluteStrokeWidth
      >
        <House />
      </YCloudProvider>,
    );

    const IconComponent = container.firstElementChild;

    expect(IconComponent).toHaveAttribute('stroke-width', '1');
  });

  it("should override the provider's global props when passing props to the icon", () => {
    cleanup();
    const { container } = render(
      <YCloudProvider
        size={48}
        color="red"
        strokeWidth={4}
      >
        <House
          size={32}
          color="blue"
          strokeWidth={3}
        />
      </YCloudProvider>,
    );

    const IconComponent = container.firstElementChild;

    expect(IconComponent).toHaveAttribute('width', '32');
    expect(IconComponent).toHaveAttribute('height', '32');
    expect(IconComponent).toHaveAttribute('stroke', 'blue');
    expect(IconComponent).toHaveAttribute('stroke-width', '3');
  });
});
