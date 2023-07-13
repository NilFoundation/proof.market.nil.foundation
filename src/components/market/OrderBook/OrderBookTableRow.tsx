/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { CSSProperties, KeyboardEventHandler, ReactElement } from 'react';
import { useContext } from 'react';
import type { Row } from 'react-table';
import { TRow } from '@/components';
import type { OrderBookDataItem } from '@/models';
import { OrderManagementContext } from '../OrderManagementContextProvider';
import { OrderBookSettingsContext } from './OrderBookSettingsContext';
import { OrderBookTableCell } from './OrderBookTableCell';

/**
 * Props.
 */
type OrderBookTableRowProps = {
    row: Row<OrderBookDataItem>;
    volume: number;
    className?: string;
};

/**
 * Order book table row.
 *
 * @param {OrderBookTableRowProps} props Props.
 * @returns React component.
 */
export const OrderBookTableRow = ({
    row,
    volume,
    className: propsClassName,
}: OrderBookTableRowProps): ReactElement => {
    const { setSelectedValues } = useContext(OrderManagementContext);
    const { displayUserOrders } = useContext(OrderBookSettingsContext);
    const onClickRow = () => {
        setSelectedValues({
            cost: row.values.cost,
            eval_time: row.values.eval_time,
        });
    };

    const onKeyDownHandler: KeyboardEventHandler = e => {
        if (e.key !== 'Enter' && e.key !== ' ') {
            return;
        }

        e.preventDefault();
        onClickRow();
    };

    const { className, style, ...rest } = row.getRowProps();
    const combinedStyle = { ...style, '--bar-width': `${volume}%` } as CSSProperties;
    const combinedClassName = `${className ?? ''} ${propsClassName ?? ''}`;

    return (
        <TRow
            {...rest}
            onClick={onClickRow}
            onKeyDown={onKeyDownHandler}
            tabIndex={0}
            style={combinedStyle}
            className={combinedClassName}
        >
            {row.cells.map(cell => {
                const { key } = cell.getCellProps();
                return (
                    <OrderBookTableCell
                        key={key}
                        cell={cell}
                        userOrdersAmount={
                            cell.column.id !== 'ordersAmount' || !displayUserOrders
                                ? undefined
                                : row.values.userOrdersAmount
                        }
                    />
                );
            })}
        </TRow>
    );
};
