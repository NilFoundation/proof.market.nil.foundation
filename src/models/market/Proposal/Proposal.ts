/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { TradeOrder } from '../TradeOrder';

/**
 * Proposal.
 */
export interface Proposal extends TradeOrder {
  /**
   * Time, when proposal was accepted, either - null.
   */
  updatedOn: number | null;
}
