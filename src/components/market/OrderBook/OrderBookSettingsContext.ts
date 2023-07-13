/**
 * @file React context.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { createContext } from 'react';

/**
 * Context type.
 */
type OrderBookSettingsContectModel = {
    displayUserOrders: boolean;
    setDisplayUserOrders: (v: boolean) => void;
};

/**
 * Order book settings context.
 */
export const OrderBookSettingsContext = createContext<OrderBookSettingsContectModel>(
    {} as OrderBookSettingsContectModel,
);
