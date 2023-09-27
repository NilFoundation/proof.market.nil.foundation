/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { CreateTradeOrder } from './CreateTradeOrder';
import type { TradeOrderStatus } from './TradeOrderStatus';

/**
 * Trade order.
 */
export interface TradeOrder extends CreateTradeOrder {
  /**
   * Id.
   */
  _key: string;
  /**
   * Order status.
   */
  status: TradeOrderStatus;
  /**
   * Id of accepted Order.
   */
  order: string | null;
  /**
   * Time of trade order creation.
   */
  createdOn: number;
  /**
   * Matched time.
   */
  matched_time?: number;
  /**
   * Real generation time.
   */
  generation_time?: number;
}
