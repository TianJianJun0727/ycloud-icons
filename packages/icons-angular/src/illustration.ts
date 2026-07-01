import { illustration404Illustration } from './illustration-icons/404';
import { accountUnboundIllustration } from './illustration-icons/account-unbound';
import { dataImportingIllustration } from './illustration-icons/data-importing';
import { emptyListIllustration } from './illustration-icons/empty-list';
import { emptyOrdersIllustration } from './illustration-icons/empty-orders';
import { emptyPageIllustration } from './illustration-icons/empty-page';
import { emptySearchIllustration } from './illustration-icons/empty-search';
import { loadFailedIllustration } from './illustration-icons/load-failed';
import { networkDisconnectedIllustration } from './illustration-icons/network-disconnected';
import { noPermissionIllustration } from './illustration-icons/no-permission';
import { paymentMethodDisabledIllustration } from './illustration-icons/payment-method-disabled';
import { waitingStatusIllustration } from './illustration-icons/waiting-status';

export * from './illustration-icons/404';
export * from './illustration-icons/account-unbound';
export * from './illustration-icons/data-importing';
export * from './illustration-icons/empty-list';
export * from './illustration-icons/empty-orders';
export * from './illustration-icons/empty-page';
export * from './illustration-icons/empty-search';
export * from './illustration-icons/load-failed';
export * from './illustration-icons/network-disconnected';
export * from './illustration-icons/no-permission';
export * from './illustration-icons/payment-method-disabled';
export * from './illustration-icons/waiting-status';

export type IllustrationDefinitionNode =
  | [tag: string, attrs: Record<string, string>]
  | [tag: string, attrs: Record<string, string>, children: IllustrationDefinitionNode[]];

export interface IllustrationDefinition {
  name: string;
  attrs: Record<string, string>;
  node: IllustrationDefinitionNode[];
}

export const illustrationNames = [
  '404',
  'account-unbound',
  'data-importing',
  'empty-list',
  'empty-orders',
  'empty-page',
  'empty-search',
  'load-failed',
  'network-disconnected',
  'no-permission',
  'payment-method-disabled',
  'waiting-status',
] as const;
export type IllustrationName = (typeof illustrationNames)[number];

export const illustrations = {
  '404': illustration404Illustration,
  'account-unbound': accountUnboundIllustration,
  'data-importing': dataImportingIllustration,
  'empty-list': emptyListIllustration,
  'empty-orders': emptyOrdersIllustration,
  'empty-page': emptyPageIllustration,
  'empty-search': emptySearchIllustration,
  'load-failed': loadFailedIllustration,
  'network-disconnected': networkDisconnectedIllustration,
  'no-permission': noPermissionIllustration,
  'payment-method-disabled': paymentMethodDisabledIllustration,
  'waiting-status': waitingStatusIllustration,
} as const satisfies Record<string, IllustrationDefinition>;

export function getIllustration(name: IllustrationName) {
  return illustrations[name];
}
