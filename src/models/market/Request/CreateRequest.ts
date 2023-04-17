/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { CreateTradeOrder } from '../TradeOrder';

/**
 * Create request data.
 */
export interface CreateRequest extends CreateTradeOrder {
    /**
     * Public input.
     */
    input: Record<string, string>;
}
