/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { Proof } from '../../portfolio';
import type { TradeOrder } from '../TradeOrder';

/**
 * Bid.
 */
export interface BidDto extends TradeOrder {
    /**
     * Public input.
     */
    public_input: Record<string, string>;
    /**
     * Proof (when generated, either - null).
     */
    proof: Proof['_key'] | null;
    /**
     * Time, when bid was accepted, either - null.
     */
    updatedOn: string | null;
}
