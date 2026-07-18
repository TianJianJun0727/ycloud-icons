import { Component, input, inputBinding, signal, WritableSignal } from '@angular/core';
import { YCloudDynamicIcon } from './ycloud-dynamic-icon';
import { YCloudIconData, YCloudIconInput } from './types';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideYCloudIcons } from './ycloud-icons';
import { YCloudActivity } from './icons/activity';
import { By } from '@angular/platform-browser';

@Component({
  template: `@if (icon(); as iconData) {
    <svg [ycloudIcon]="iconData">
      <rect
        x="1"
        y="1"
        width="22"
        height="22"
      />
    </svg>
  }`,
  imports: [YCloudDynamicIcon],
})
class TestHostComponent {
  readonly icon = input<YCloudIconData>();
}

describe('YCloudDynamicIcon', () => {
  let component: YCloudDynamicIcon;
  let fixture: ComponentFixture<YCloudDynamicIcon>;
  let icon: WritableSignal<YCloudIconInput | null | undefined>;
  const getSvgAttribute = (attr: string) => fixture.nativeElement.getAttribute(attr);
  const testIcon: YCloudIconData = {
    name: 'demo',
    node: [['polyline', { points: '1 1 22 22' }]],
  };
  const testIcon2: YCloudIconData = {
    name: 'demo-other',
    node: [
      ['circle', { cx: 12, cy: 12, r: 8 }],
      ['polyline', { points: '1 1 22 22' }],
    ],
    aliases: ['demo-2'],
  };
  function createComponent() {
    return TestBed.createComponent(YCloudDynamicIcon, {
      inferTagName: true,
      bindings: [inputBinding('ycloudIcon', icon)],
    });
  }
  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideYCloudIcons(testIcon)],
    });
    icon = signal('demo');
    fixture = createComponent();
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render children', () => {
    icon.set(testIcon2);
    fixture.detectChanges();
    expect(
      Array.from(fixture.nativeElement.children as HTMLCollectionOf<Element>).map(
        (child) => child.tagName,
      ),
    ).toEqual(['circle', 'polyline']);
  });

  it('should preserve safe attributes on custom icon nodes', () => {
    icon.set({
      name: 'custom',
      node: [
        [
          'path',
          {
            d: 'M0 0h1v1z',
            opacity: 0.5,
            transform: 'translate(1 1)',
            'fill-rule': 'evenodd',
            'stroke-linecap': 'square',
            pathLength: 1,
          },
        ],
      ],
    });
    fixture.detectChanges();

    const path = fixture.nativeElement.querySelector('path') as SVGPathElement;
    expect(path.getAttribute('opacity')).toBe('0.5');
    expect(path.getAttribute('transform')).toBe('translate(1 1)');
    expect(path.getAttribute('fill-rule')).toBe('evenodd');
    expect(path.getAttribute('stroke-linecap')).toBe('square');
    expect(path.getAttribute('pathLength')).toBe('1');
  });

  it('should remove children on change', () => {
    icon.set(null);
    fixture.detectChanges();
    expect(fixture.nativeElement.children).toHaveLength(0);
  });

  describe('iconInput', () => {
    it('should support YCloudIconData input', () => {
      icon.set(testIcon);
      fixture.detectChanges();
      expect(component['icon']()).toBe(testIcon);
      expect(fixture.nativeElement.querySelector('polyline')?.getAttribute('points')).toBe(
        '1 1 22 22',
      );
    });
    it('should support YCloudIcon input', () => {
      icon.set(YCloudActivity);
      fixture.detectChanges();
      expect(component['icon']()).toBe(YCloudActivity.icon);
    });
    it('should support string icon name', () => {
      icon.set('demo');
      fixture.detectChanges();
      expect(component['icon']()).toBe(testIcon);
    });
    it('should throw error if no icon found', () => {
      icon.set('invalid');
      expect(() => fixture.detectChanges()).toThrowError(`Unable to resolve icon 'invalid'`);
    });
  });

  describe('class', () => {
    it('should add all classes', () => {
      fixture.detectChanges();
      expect(getSvgAttribute('class')).toBe('ycloud ycloud-demo');
    });
    it('should add backwards compatible classes from aliases', () => {
      icon.set(testIcon2);
      fixture.detectChanges();
      expect(new Set(fixture.nativeElement.classList)).toEqual(
        new Set(['ycloud', 'ycloud-demo-other', 'ycloud-demo-2']),
      );
    });
    it('should add class icon if available', () => {
      icon.set(YCloudActivity);
      fixture.detectChanges();

      expect(getSvgAttribute('class')).toBe('ycloud ycloud-activity');
    });
    it('should remove class on change', () => {
      icon.set(null);
      fixture.detectChanges();
      expect(getSvgAttribute('class')).toBe('ycloud');
    });
  });

  describe('content projection', () => {
    it('should project content', () => {
      const hostFixture = TestBed.createComponent(TestHostComponent);
      hostFixture.componentRef.setInput('icon', testIcon);
      hostFixture.detectChanges();
      hostFixture.componentRef.setInput('icon', testIcon2);
      hostFixture.detectChanges();
      const rect = hostFixture.debugElement.query(By.css('svg :last-child')).nativeElement;
      expect(rect).toBeInstanceOf(SVGElement);
      expect(rect.outerHTML).toBe('<rect x="1" y="1" width="22" height="22"></rect>');
    });
  });
});
