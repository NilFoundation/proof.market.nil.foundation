/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { OrderDto } from './dto';
import { Proposal } from './Proposal';

/**
 * Order.
 */
export type Order = {
    id: string;
    status: string;
    proposal: Proposal | null;
    proof: null;
} & OrderDto;
