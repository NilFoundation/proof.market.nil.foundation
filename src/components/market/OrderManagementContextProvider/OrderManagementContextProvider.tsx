/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement, ReactNode } from 'react';
import { useState } from 'react';
import type { CostAndEvalTime } from '@/models';
import { OrderManagementContext } from './OrderManagementContext';

/**
 * Props.
 */
type OrderManagementContextProviderProps = {
    children?: ReactNode;
};

/**
 * Order management context provider.
 *
 * @param {OrderManagementContextProviderProps} props Props.
 * @returns React component.
 */
export const OrderManagementContextProvider = ({
    children,
}: OrderManagementContextProviderProps): ReactElement => {
    const [processing, setProcessing] = useState(false);
    const [selectedValues, setSelectedValues] = useState<CostAndEvalTime>();

    return (
        <OrderManagementContext.Provider
            value={{ processing, setProcessing, selectedValues, setSelectedValues }}
        >
            {children}
        </OrderManagementContext.Provider>
    );
};
