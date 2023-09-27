/**
 * @file Utility function.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { Proposal, Request } from '@/models';

/**
 *
 * @param first First order.
 * @param second Second order.
 * @returns Comparsion result.
 */
export const sortTradeOrdersByDate = <T extends Request | Proposal>(first: T, second: T): number =>
  Date.parse(first.createdOn.toString()) - Date.parse(second.createdOn.toString());
