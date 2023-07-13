/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { TradeOrder } from '@/models';

/**
 * Cost and eval_time from trade order.
 */
export type CostAndEvalTime = Pick<TradeOrder, 'cost' | 'eval_time'>;
