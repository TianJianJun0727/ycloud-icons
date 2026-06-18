import { render } from '@solidjs/testing-library';
import { describe, expect, it } from 'vitest';
import { House, YCloudProvider } from '../src/ycloud-solid';

describe('Using YCloudProvider', () => {
  it('should render the icon with YCloudProvider', () => {
    const { container } = render(() => (
      <YCloudProvider
        size={48}
        color="red"
      >
        <House />
      </YCloudProvider>
    ));

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render the icon with default props when no provider is used', () => {
    const { container } = render(() => <House />);

    const IconComponent = container.firstElementChild;

    expect(IconComponent).toHaveAttribute('width', '24');
    expect(IconComponent).toHaveAttribute('height', '24');
    expect(IconComponent).toHaveAttribute('stroke', 'currentColor');
    expect(IconComponent).toHaveAttribute('stroke-width', '2');
  });

  it('should render the icon with YCloudProvider and custom strokeWidth', () => {
    const { container } = render(() => (
      <YCloudProvider
        size={48}
        color="red"
        strokeWidth={4}
      >
        <House />
      </YCloudProvider>
    ));

    const IconComponent = container.firstElementChild;

    expect(IconComponent).toHaveAttribute('width', '48');
    expect(IconComponent).toHaveAttribute('height', '48');
    expect(IconComponent).toHaveAttribute('stroke', 'red');
    expect(IconComponent).toHaveAttribute('stroke-width', '4');
  });

  it('should render the icon with YCloudProvider and custom absoluteStrokeWidth', () => {
    const { container } = render(() => (
      <YCloudProvider
        size={48}
        color="red"
        absoluteStrokeWidth
      >
        <House />
      </YCloudProvider>
    ));

    const IconComponent = container.firstElementChild;

    expect(IconComponent).toHaveAttribute('stroke-width', '1');
  });

  it("should override the provider's global props when passing props to the icon", () => {
    const { container } = render(() => (
      <YCloudProvider
        size={48}
        color="red"
        strokeWidth={4}
      >
        <House
          size={24}
          color="blue"
          strokeWidth={2}
        />
      </YCloudProvider>
    ));

    const IconComponent = container.firstElementChild;

    expect(IconComponent).toHaveAttribute('width', '24');
    expect(IconComponent).toHaveAttribute('height', '24');
    expect(IconComponent).toHaveAttribute('stroke', 'blue');
    expect(IconComponent).toHaveAttribute('stroke-width', '2');
  });

  it('should merge className from provider and icon', () => {
    const { container } = render(() => (
      <YCloudProvider class="provider-class">
        <House class="icon-class" />
      </YCloudProvider>
    ));

    const IconComponent = container.firstElementChild;

    expect(IconComponent).toHaveAttribute(
      'class',
      'ycloud ycloud-icon provider-class ycloud-house icon-class',
    );
  });
});
