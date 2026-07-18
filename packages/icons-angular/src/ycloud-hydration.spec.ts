import { ApplicationRef, Component, destroyPlatform, Provider, Type } from '@angular/core';
import { bootstrapApplication, provideClientHydration } from '@angular/platform-browser';
import { provideServerRendering, renderApplication } from '@angular/platform-server';
import { YCloudDynamicIcon } from './ycloud-dynamic-icon';
import { provideYCloudIcons } from './ycloud-icons';
import { YCloudBadgeAlert } from './icons/badge-alert';

@Component({
  selector: 'ycloud-static-hydration-root',
  template: `<svg
    ycloudBadgeAlert
    [absoluteStrokeWidth]="true"
  ></svg>`,
  imports: [YCloudBadgeAlert],
})
class StaticHydrationRootComponent {}

@Component({
  selector: 'ycloud-dynamic-hydration-root',
  template: `<svg [ycloudIcon]="'badge-alert'"></svg>`,
  imports: [YCloudDynamicIcon],
})
class DynamicHydrationRootComponent {}

describe('YCloud hydration', () => {
  let appRef: ApplicationRef | undefined;
  let warnSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warnSpy = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    warnSpy.mockRestore();
    appRef?.destroy();
    appRef = undefined;
    document.body.innerHTML = '';
    delete (globalThis as { ngServerMode?: boolean }).ngServerMode;
    destroyPlatform();
  });

  async function renderAndHydrate(
    rootComponent: Type<unknown>,
    selector: string,
    providers: Provider[] = [],
  ) {
    delete (globalThis as { ngServerMode?: boolean }).ngServerMode;
    const appConfig = {
      providers: [provideClientHydration(), ...providers],
    };
    const serverAppConfig = {
      providers: [provideServerRendering(), provideClientHydration(), ...providers],
    };
    const html = await renderApplication(
      (context) => bootstrapApplication(rootComponent, serverAppConfig, context),
      {
        document: `<!doctype html><html><head></head><body><${selector}></${selector}></body></html>`,
        url: 'http://localhost/',
        allowedHosts: ['localhost'],
      },
    );
    (globalThis as { ngServerMode?: boolean }).ngServerMode = false;
    const serverDocument = new DOMParser().parseFromString(html, 'text/html');
    expectBadgeAlertShapeNodes(serverDocument.querySelector('svg') as SVGSVGElement);
    document.head.innerHTML = serverDocument.head.innerHTML;
    document.body.innerHTML = serverDocument.body.innerHTML;

    appRef = await bootstrapApplication(rootComponent, appConfig);
    await appRef.whenStable();

    const hasMissingHydrationWarning = warnSpy.mock.calls.some((call: unknown[]) =>
      String(call[0]).includes('NG0505'),
    );
    expect(hasMissingHydrationWarning).toBe(false);

    return document.querySelector('svg') as SVGSVGElement;
  }

  function expectBadgeAlertShapeNodes(svg: SVGSVGElement) {
    expect(Array.from(svg.children).map((child) => child.tagName.toLowerCase())).toEqual([
      'path',
      'line',
      'line',
    ]);
  }

  it('should hydrate static icon children without duplicating SSR nodes', async () => {
    const svg = await renderAndHydrate(
      StaticHydrationRootComponent,
      'ycloud-static-hydration-root',
    );

    expectBadgeAlertShapeNodes(svg);
    for (const child of Array.from(svg.children)) {
      expect(child.getAttribute('vector-effect')).toBe('non-scaling-stroke');
    }
  });

  it('should hydrate dynamic icon children without duplicating SSR nodes', async () => {
    const svg = await renderAndHydrate(
      DynamicHydrationRootComponent,
      'ycloud-dynamic-hydration-root',
      [provideYCloudIcons(YCloudBadgeAlert)],
    );

    expectBadgeAlertShapeNodes(svg);
  });
});
