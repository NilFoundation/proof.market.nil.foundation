/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { TradeOrder } from 'src/models';

/**
 * Cost and eval_time from trade order.
 */
export type CostAndEvalTime = Pick<TradeOrder, 'cost' | 'eval_time'>;
