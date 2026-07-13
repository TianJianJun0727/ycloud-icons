import { botfilledIcon } from './business-icons/botfilled';
import { comingSoonIcon } from './business-icons/coming-soon';
import { hubSpotIcon } from './business-icons/hub-spot';
import { metaFilledIcon } from './business-icons/meta-filled';
import { shopifyIcon } from './business-icons/shopify';
import { trophyIcon } from './business-icons/trophy';

export * from './business-icons/botfilled';
export {
  default as Botfilled,
  default as BotfilledIcon,
  default as YCloudBotfilled,
} from './business-icons/botfilled';
export * from './business-icons/coming-soon';
export {
  default as ComingSoon,
  default as ComingSoonIcon,
  default as YCloudComingSoon,
} from './business-icons/coming-soon';
export * from './business-icons/hub-spot';
export {
  default as HubSpot,
  default as HubSpotIcon,
  default as YCloudHubSpot,
} from './business-icons/hub-spot';
export * from './business-icons/meta-filled';
export {
  default as MetaFilled,
  default as MetaFilledIcon,
  default as YCloudMetaFilled,
} from './business-icons/meta-filled';
export * from './business-icons/shopify';
export {
  default as Shopify,
  default as ShopifyIcon,
  default as YCloudShopify,
} from './business-icons/shopify';
export * from './business-icons/trophy';
export {
  default as Trophy,
  default as TrophyIcon,
  default as YCloudTrophy,
} from './business-icons/trophy';

export type BusinessIconDefinitionNode =
  | readonly [tag: string, attrs: Record<string, string>]
  | readonly [
      tag: string,
      attrs: Record<string, string>,
      children: readonly BusinessIconDefinitionNode[],
    ];

export interface BusinessIconDefinition {
  name: string;
  colorMode: 'mono' | 'duotone' | 'multicolor';
  attrs: Record<string, string>;
  node: readonly BusinessIconDefinitionNode[];
}

export const businessIconNames = [
  'botfilled',
  'coming-soon',
  'hub-spot',
  'meta-filled',
  'shopify',
  'trophy',
] as const;
export type BusinessIconName = (typeof businessIconNames)[number];

export const businessIcons = {
  botfilled: botfilledIcon,
  'coming-soon': comingSoonIcon,
  'hub-spot': hubSpotIcon,
  'meta-filled': metaFilledIcon,
  shopify: shopifyIcon,
  trophy: trophyIcon,
} as const satisfies Record<string, BusinessIconDefinition>;

export function getBusinessIcon(name: BusinessIconName) {
  return businessIcons[name];
}
