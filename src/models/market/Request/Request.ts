/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { Proof } from '../../portfolio';
import type { TradeOrder } from '../TradeOrder';

/**
 * Request.
 */
export interface Request extends TradeOrder {
    /**
     * Public input.
     */
    public_input: Record<string, string>;
    /**
     * Proof (when generated, either - null).
     */
    proof: Proof['_key'] | null;
    /**
     * Time, when request was accepted, either - null.
     */
    updatedOn: string | null;
}
