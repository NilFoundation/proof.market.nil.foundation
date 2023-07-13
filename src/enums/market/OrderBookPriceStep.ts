/**
 * @file Enum declaration.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

/**
 * Orderbook price step type.
 */
export type OrderBookPriceStepType = '0.001' | '0.01' | '0.1' | '1';

/**
 * Order book price step.
 */
export const OrderBookPriceStep = {
    '0.001': '0.001',
    '0.01': '0.01',
    '0.1': '0.1',
    '1': '1',
} as const satisfies Record<OrderBookPriceStepType, OrderBookPriceStepType>;
