/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Label } from '@nilfoundation/react-components';
import type { Cell } from 'react-table';
import { TCell } from '@/components';
import { renderDashOnEmptyValue } from '@/utils';
import type { OrderBookDataItem } from '@/models';

/**
 * Props.
 */
type OrderBookTableCellProps = {
    cell: Cell<OrderBookDataItem>;
    userOrdersAmount?: number;
};

/**
 * Order book table cell.
 *
 * @param {OrderBookTableCellProps} props Props.
 * @returns React component.
 */
export const OrderBookTableCell = ({
    cell,
    userOrdersAmount,
}: OrderBookTableCellProps): ReactElement => {
    const { column, value, getCellProps } = cell;

    return (
        <TCell {...getCellProps()}>
            <span>{column.id === 'ordersAmount' ? value : renderDashOnEmptyValue(value)}</span>
            {!!userOrdersAmount && (
                <Label>
                    <span>{userOrdersAmount}</span>
                </Label>
            )}
        </TCell>
    );
};
