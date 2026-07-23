import { describe, expect, it } from 'vitest';
import {
  buildBusinessIconModule,
  buildBusinessIconsIndex,
  buildBusinessPreactIconModule,
  buildBusinessReactIconModule,
  buildBusinessReactIconsIndex,
  buildBusinessSolidIconModule,
  buildBusinessSvelteIconModule,
  buildBusinessVueIconModule,
  getBusinessIconExportBase,
  getBusinessIconComponentName,
} from './generateBusinessIconsPackage.mts';

describe('generateBusinessIconsPackage', () => {
  it('creates stable export names for kebab-case and numeric icon names', () => {
    expect(getBusinessIconExportBase('whatsapp-business')).toBe('whatsappBusiness');
    expect(getBusinessIconExportBase('2fa-status')).toBe('business2faStatus');
    expect(getBusinessIconComponentName('whatsapp-business')).toBe('WhatsappBusiness');
    expect(getBusinessIconComponentName('2fa-status')).toBe('Business2faStatus');
  });

  it('generates an icon definition module with parsed SVG nodes', () => {
    const svg = '<svg viewBox="0 0 16 16"><path fill="#25D366" d="M0 0h16v16H0z"/></svg>';
    const moduleSource = buildBusinessIconModule('whatsapp-business', svg, 'filled');

    expect(moduleSource).toContain('export const whatsappBusinessIcon = {');
    expect(moduleSource).toContain('"viewBox":"0 0 16 16"');
    expect(moduleSource).toContain('"fill":"#25D366"');
    expect(moduleSource).toContain("colorMode: 'filled'");
  });

  it('generates an index that exports names, definitions, and icon modules', () => {
    const indexSource = buildBusinessIconsIndex(['2fa-status', 'whatsapp-business']);

    expect(indexSource).toContain("export * from './business-icons/2fa-status';");
    expect(indexSource).toContain("export * from './business-icons/whatsapp-business';");
    expect(indexSource).toContain(
      "export const businessIconNames = ['2fa-status', 'whatsapp-business'] as const;",
    );
    expect(indexSource).toContain("'2fa-status': business2faStatusIcon");
    expect(indexSource).toContain("'whatsapp-business': whatsappBusinessIcon");
  });

  it('generates React inline components with fixed white details for filled business icons', () => {
    const moduleSource = buildBusinessReactIconModule(
      'whatsapp-business',
      'filled',
      '<svg fill="var(--business-icon-primary-color)" viewBox="0 0 16 16"><path d="M0 0h16v16H0z"/><path fill="#fff" d="M4 4h8v8H4z"/></svg>',
    );

    expect(moduleSource).toContain("import { forwardRef } from 'react';");
    expect(moduleSource).toContain(
      'forwardRef<SVGSVGElement, BusinessIconImageProps>',
    );
    expect(moduleSource).toContain('fill={color}');
    expect(moduleSource).toContain('fill="#fff"');
    expect(moduleSource).not.toContain('dangerouslySetInnerHTML');
  });

  it('generates React inline components for outlined business icons', () => {
    const moduleSource = buildBusinessReactIconModule(
      'contact',
      'outlined',
      '<svg fill="currentColor" viewBox="0 0 16 16"><path d="M0 0h16v16H0z"/></svg>',
    );

    expect(moduleSource).toContain('forwardRef<SVGSVGElement');
    expect(moduleSource).toContain('<svg');
    expect(moduleSource).toContain('<path d="M0 0h16v16H0z" />');
    expect(moduleSource).toContain('color');
    expect(moduleSource).not.toContain('dangerouslySetInnerHTML');
  });

  it('generates React inline components without color props for multicolor business icons', () => {
    const moduleSource = buildBusinessReactIconModule(
      'shopify',
      'multicolor',
      '<svg viewBox="0 0 16 16"><path fill="#95BF47" d="M0 0h16v16H0z"/></svg>',
    );

    expect(moduleSource).toContain('type ShopifyProps = Omit<BusinessIconImageProps,');
    expect(moduleSource).toContain('forwardRef<SVGSVGElement, ShopifyProps>');
    expect(moduleSource).toContain('fill="#95BF47"');
    expect(moduleSource).not.toContain('color =');
  });

  it('generates a React index with named component exports', () => {
    const indexSource = buildBusinessReactIconsIndex(['2fa-status', 'whatsapp-business']);

    expect(indexSource).toContain(
      "export { default as Business2faStatus, default as Business2faStatusIcon, default as YCloudBusiness2faStatus } from './business-icons/2fa-status';",
    );
    expect(indexSource).toContain(
      "export { default as WhatsappBusiness, default as WhatsappBusinessIcon, default as YCloudWhatsappBusiness } from './business-icons/whatsapp-business';",
    );
    expect(indexSource).toContain("export type { BusinessIconImageProps } from './businessTypes';");
  });

  it('generates inline SVG components in non-React component packages', () => {
    const svg = '<svg fill="currentColor" viewBox="0 0 16 16"><path d="M0 0h16v16H0z"/></svg>';
    const solidSource = buildBusinessSolidIconModule('whatsapp-business', svg, 'outlined');
    const svelteSource = buildBusinessSvelteIconModule('whatsapp-business', svg, 'outlined');

    expect(solidSource).toContain('<svg');
    expect(solidSource).toContain('fill="currentColor"');
    expect(solidSource).toContain('color={color}');
    expect(solidSource).toContain('<path d="M0 0h16v16H0z" />');
    expect(svelteSource).toContain('<svg');
    expect(svelteSource).toContain('fill="currentColor"');
    expect(svelteSource).toContain('color={color}');
    expect(svelteSource).toContain('<path d="M0 0h16v16H0z" />');
    expect(solidSource).not.toContain('@ycloud-web/icons/business');
    expect(svelteSource).not.toContain('@ycloud-web/icons/business');
  });

  it('lets outlined and filled React business icons override stroke width explicitly', () => {
    const moduleSource = buildBusinessReactIconModule(
      'stroke-icon',
      'outlined',
      '<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 16 16"><path stroke-width="3" d="M0 0h16v16"/></svg>',
    );

    expect(moduleSource).toContain('strokeWidth, style');
    expect(moduleSource).toContain('strokeWidth={strokeWidth ?? "1.5"}');
    expect(moduleSource).toContain('strokeWidth={strokeWidth ?? "3"}');

    const moduleWithoutRootStrokeWidth = buildBusinessReactIconModule(
      'stroke-icon',
      'outlined',
      '<svg fill="none" stroke="currentColor" viewBox="0 0 16 16"><path d="M0 0h16v16"/></svg>',
    );

    expect(moduleWithoutRootStrokeWidth).toContain('strokeWidth={strokeWidth}');
  });

  it('keeps multicolor business icon stroke width fixed', () => {
    const moduleSource = buildBusinessReactIconModule(
      'shopify',
      'multicolor',
      '<svg stroke-width="1.5" viewBox="0 0 16 16"><path fill="#95BF47" stroke-width="3" d="M0 0h16v16H0z"/></svg>',
    );

    expect(moduleSource).toContain(
      "type ShopifyProps = Omit<BusinessIconImageProps, 'color' | 'strokeWidth'>;",
    );
    expect(moduleSource).toContain('strokeWidth="1.5"');
    expect(moduleSource).toContain('strokeWidth="3"');
    expect(moduleSource).not.toContain('strokeWidth, style');
    expect(moduleSource).not.toContain('strokeWidth={strokeWidth');
  });

  it('lets non-React inline business icon packages override stroke width explicitly', () => {
    const svg =
      '<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 16 16"><path stroke-width="3" d="M0 0h16v16"/></svg>';

    const preactSource = buildBusinessPreactIconModule('stroke-icon', svg, 'outlined');
    const vueSource = buildBusinessVueIconModule('stroke-icon', svg, 'outlined');
    const solidSource = buildBusinessSolidIconModule('stroke-icon', svg, 'outlined');
    const svelteSource = buildBusinessSvelteIconModule('stroke-icon', svg, 'outlined');

    expect(preactSource).toContain('"stroke-width": strokeWidth ?? "1.5"');
    expect(preactSource).toContain('"stroke-width": strokeWidth ?? "3"');
    expect(vueSource).toContain('"stroke-width": strokeWidth ?? "1.5"');
    expect(solidSource).toContain('stroke-width={strokeWidth ?? "1.5"}');
    expect(svelteSource).toContain('stroke-width={strokeWidth ?? "1.5"}');
  });
});
