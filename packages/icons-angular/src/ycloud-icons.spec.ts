import { TestBed } from '@angular/core/testing';
import {
  YCLOUD_ICONS,
  ycloudLegacyIcon,
  ycloudLegacyIconMap,
  provideYCloudIcons,
} from './ycloud-icons';
import { isYCloudIconComponent, isYCloudIconData, YCloudIconData } from './types';
import { YCloudCircle } from './icons/circle';

describe('YCloud icons', () => {
  describe('YCLOUD_ICONS', () => {
    it('should default to empty map', () => {
      expect(TestBed.inject(YCLOUD_ICONS)).toEqual({});
    });
  });
  describe('provideYCloudIcons', () => {
    const mockIcon: YCloudIconData = {
      name: 'mock-icon',
      node: [['polyline', { points: '1 1 22 22' }]],
    };
    const mockIcon2: YCloudIconData = {
      name: 'mock-icon-circle',
      node: [['circle', { cx: 12, cy: 12, r: 8 }]],
      aliases: ['mock-icon-2'],
    };
    const legacyIconNode: YCloudIconData['node'] = [['circle', { cx: 12, cy: 12, r: 8 }]];
    const legacyAlias = 'legacy-old-name';
    const OtherLegacyIcon = legacyIconNode;
    it('should accept list of icon object, icon components or legacy icons', () => {
      TestBed.configureTestingModule({
        providers: [
          provideYCloudIcons(
            mockIcon,
            mockIcon2,
            YCloudCircle,
            ycloudLegacyIcon('legacy-icon', legacyIconNode, [legacyAlias]),
            ...ycloudLegacyIconMap({ OtherLegacyIcon }),
          ),
        ],
      });
      const legacyIconData = {
        name: 'legacy-icon',
        node: legacyIconNode,
        aliases: [legacyAlias],
      };
      const otherLegacyIconData = {
        name: 'other-legacy-icon',
        node: legacyIconNode,
        aliases: ['OtherLegacyIcon'],
      };
      expect(TestBed.inject(YCLOUD_ICONS)).toEqual({
        'mock-icon': mockIcon,
        'mock-icon-circle': mockIcon2,
        'mock-icon-2': mockIcon2,
        'legacy-icon': legacyIconData,
        'legacy-old-name': legacyIconData,
        'other-legacy-icon': otherLegacyIconData,
        OtherLegacyIcon: otherLegacyIconData,
        ['circle']: YCloudCircle.icon,
      });
    });
    it('should reject invalid icon data at provider creation time', () => {
      expect(() =>
        provideYCloudIcons({
          name: 'invalid',
          node: [['path', { d: undefined }]],
        } as unknown as YCloudIconData),
      ).toThrowError('Invalid YCloud icon provider input.');
    });
  });
  describe('type guards', () => {
    it('should identify icon data with valid nodes and aliases', () => {
      expect(
        isYCloudIconData({
          name: 'mock-icon',
          node: [['path', { d: 'M0 0h1v1z', opacity: 0.5 }]],
          aliases: ['mock-alias'],
        }),
      ).toBe(true);
    });
    it('should reject malformed icon nodes and aliases', () => {
      expect(
        isYCloudIconData({
          name: 'mock-icon',
          node: [['path', { d: undefined }]],
        }),
      ).toBe(false);
      expect(
        isYCloudIconData({
          name: 'mock-icon',
          node: [['path', { d: 'M0 0h1v1z' }]],
          aliases: [123],
        }),
      ).toBe(false);
    });
    it('should only identify Angular component classes as icon components', () => {
      expect(isYCloudIconComponent(YCloudCircle)).toBe(true);
      expect(isYCloudIconComponent({ icon: YCloudCircle.icon })).toBe(false);
    });
  });
});
