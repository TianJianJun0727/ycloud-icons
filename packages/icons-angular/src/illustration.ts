import { accountUnboundIllustration } from './illustration-icons/account-unbound';
import { dataImportingIllustration } from './illustration-icons/data-importing';
import { emptyListIllustration } from './illustration-icons/empty-list';
import { emptyOrdersIllustration } from './illustration-icons/empty-orders';
import { emptyPageIllustration } from './illustration-icons/empty-page';
import { emptySearchIllustration } from './illustration-icons/empty-search';
import { loadFailedIllustration } from './illustration-icons/load-failed';
import { networkDisconnectedIllustration } from './illustration-icons/network-disconnected';
import { noPermissionIllustration } from './illustration-icons/no-permission';
import { notFoundIllustration } from './illustration-icons/not-found';
import { paymentMethodDisabledIllustration } from './illustration-icons/payment-method-disabled';
import { waitingStatusIllustration } from './illustration-icons/waiting-status';

export * from './illustration-icons/account-unbound';
export * from './illustration-icons/data-importing';
export * from './illustration-icons/empty-list';
export * from './illustration-icons/empty-orders';
export * from './illustration-icons/empty-page';
export * from './illustration-icons/empty-search';
export * from './illustration-icons/load-failed';
export * from './illustration-icons/network-disconnected';
export * from './illustration-icons/no-permission';
export * from './illustration-icons/not-found';
export * from './illustration-icons/payment-method-disabled';
export * from './illustration-icons/waiting-status';

export type IllustrationDefinitionNode =
  | readonly [tag: string, attrs: Record<string, string>]
  | readonly [tag: string, attrs: Record<string, string>, children: readonly IllustrationDefinitionNode[]];

export interface IllustrationDefinition {
  name: string;
  attrs: Record<string, string>;
  node: readonly IllustrationDefinitionNode[];
}

export const illustrationNames = ['account-unbound', 'data-importing', 'empty-list', 'empty-orders', 'empty-page', 'empty-search', 'load-failed', 'network-disconnected', 'no-permission', 'not-found', 'payment-method-disabled', 'waiting-status'] as const;
export type IllustrationName = (typeof illustrationNames)[number];

export const illustrations = {
  'account-unbound': accountUnboundIllustration,
  'data-importing': dataImportingIllustration,
  'empty-list': emptyListIllustration,
  'empty-orders': emptyOrdersIllustration,
  'empty-page': emptyPageIllustration,
  'empty-search': emptySearchIllustration,
  'load-failed': loadFailedIllustration,
  'network-disconnected': networkDisconnectedIllustration,
  'no-permission': noPermissionIllustration,
  'not-found': notFoundIllustration,
  'payment-method-disabled': paymentMethodDisabledIllustration,
  'waiting-status': waitingStatusIllustration,
} as const satisfies Record<string, IllustrationDefinition>;

export function getIllustration(name: IllustrationName) {
  return illustrations[name];
}
