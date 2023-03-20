/**
 * @file React context.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createContext } from 'react';
import type { CostAndEvalTime } from '@/models';

/**
 * Context type.
 */
type OrderManagementContextModel = {
    processing: boolean;
    setProcessing: (processing: boolean) => void;
    selectedValues?: CostAndEvalTime;
    setSelectedValues: (costAndEvalTime?: CostAndEvalTime) => void;
};

/**
 * Order management context.
 */
export const OrderManagementContext = createContext<OrderManagementContextModel>(
    {} as OrderManagementContextModel,
);
