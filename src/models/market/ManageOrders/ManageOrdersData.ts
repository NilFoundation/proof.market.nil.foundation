/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { TradeOrderStatus, TradeOrderType } from '../TradeOrder';

/**
 * Manage orders data.
 */
export type ManageOrdersData = {
    init_time: number;
    timestamp: number | null;
    cost: number;
    eval_time?: number;
    type: TradeOrderType;
    orderId: string;
    status: TradeOrderStatus;
};
