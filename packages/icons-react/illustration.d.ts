import * as react from 'react';
import { SVGProps } from 'react';

interface IllustrationProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  width?: number | string;
  height?: number | string;
  alt?: string;
}

declare const Illustration404: react.ForwardRefExoticComponent<
  Omit<IllustrationProps, 'ref'> & react.RefAttributes<SVGSVGElement>
>;

declare const AccountUnbound: react.ForwardRefExoticComponent<
  Omit<IllustrationProps, 'ref'> & react.RefAttributes<SVGSVGElement>
>;

declare const DataImporting: react.ForwardRefExoticComponent<
  Omit<IllustrationProps, 'ref'> & react.RefAttributes<SVGSVGElement>
>;

declare const EmptyList: react.ForwardRefExoticComponent<
  Omit<IllustrationProps, 'ref'> & react.RefAttributes<SVGSVGElement>
>;

declare const EmptyOrders: react.ForwardRefExoticComponent<
  Omit<IllustrationProps, 'ref'> & react.RefAttributes<SVGSVGElement>
>;

declare const EmptyPage: react.ForwardRefExoticComponent<
  Omit<IllustrationProps, 'ref'> & react.RefAttributes<SVGSVGElement>
>;

declare const EmptySearch: react.ForwardRefExoticComponent<
  Omit<IllustrationProps, 'ref'> & react.RefAttributes<SVGSVGElement>
>;

declare const LoadFailed: react.ForwardRefExoticComponent<
  Omit<IllustrationProps, 'ref'> & react.RefAttributes<SVGSVGElement>
>;

declare const NetworkDisconnected: react.ForwardRefExoticComponent<
  Omit<IllustrationProps, 'ref'> & react.RefAttributes<SVGSVGElement>
>;

declare const NoPermission: react.ForwardRefExoticComponent<
  Omit<IllustrationProps, 'ref'> & react.RefAttributes<SVGSVGElement>
>;

declare const PaymentMethodDisabled: react.ForwardRefExoticComponent<
  Omit<IllustrationProps, 'ref'> & react.RefAttributes<SVGSVGElement>
>;

declare const WaitingStatus: react.ForwardRefExoticComponent<
  Omit<IllustrationProps, 'ref'> & react.RefAttributes<SVGSVGElement>
>;

export {
  AccountUnbound,
  DataImporting,
  EmptyList,
  EmptyOrders,
  EmptyPage,
  EmptySearch,
  Illustration404,
  LoadFailed,
  NetworkDisconnected,
  NoPermission,
  PaymentMethodDisabled,
  WaitingStatus,
};
export type { IllustrationProps };
