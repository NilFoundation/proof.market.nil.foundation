/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, memo, useCallback, useMemo } from 'react';
import { Row, TableInstance, TableState, SortByFn } from 'react-table';
import { LastOrderData, OrderBookTableColumn, OrderBookTableData } from 'src/models';
import { ReactTable } from 'src/components';
import { OrderBookTableRow } from './OrderBookTableRow';
import styles from './OrderBook.module.scss';

/**
 * Props.
 */
type OrderBookTableProps = {
    type: 'bids' | 'asks';
    data: OrderBookTableData[];
    lastOrderData?: LastOrderData;
    maxVolume: number;
};

type RowWithVolume = Row<OrderBookTableData> & { volume: number };

/**
 * Initial table state without user interactions.
 */
const defaultOrderBookState: Partial<TableState<OrderBookTableData>> = {
    sortBy: [
        {
            id: 'cost',
            desc: true,
        },
    ],
    hiddenColumns: ['type', 'userOrdersAmount'],
};

/**
 * Order book table.
 *
 * @param {OrderBookTableProps} props Props.
 * @returns React component.
 */
export const OrderBookTable = memo(function OrderBookTable({
    type,
    data,
    maxVolume,
}: OrderBookTableProps): ReactElement {
    const columns = useMemo(
        (): OrderBookTableColumn[] => [
            {
                Header: type === 'asks' ? 'Ask' : 'Bid',
                accessor: 'ordersAmount',
                disableSortBy: true,
            },
            {
                Header: 'Cost',
                accessor: 'cost',
                sortType: customSortFunction,
                sortDescFirst: true,
            },
            {
                Header: 'Generation time',
                accessor: 'eval_time',
                sortType: customSortFunction,
                sortDescFirst: true,
            },
            {
                accessor: 'type',
            },
            {
                accessor: 'userOrdersAmount',
            },
        ],
        [type],
    );

    const renderRows = useCallback(
        ({ rows, prepareRow }: TableInstance<OrderBookTableData>) => {
            return (
                <div className={styles.rowsContainer}>
                    {getDataWithVolumes(rows, maxVolume).map(row =>
                        renderRow(row, prepareRow, type === 'asks' ? styles.ask : styles.bid),
                    )}
                </div>
            );
        },
        [maxVolume, type],
    );

    return (
        <ReactTable
            name={type === 'asks' ? 'asksTable' : 'bidsTable'}
            className={styles.orderBookTable}
            renderRows={renderRows}
            data={data}
            columns={columns}
            disableSortRemove={true}
            initialState={defaultOrderBookState}
        />
    );
});

/**
 * Render row.
 *
 * @param row Row instance.
 * @param prepareRow Prepare row callback.
 * @param className HTML Class.
 * @returns Row.
 */
const renderRow = (
    row: RowWithVolume,
    prepareRow: (r: Row<OrderBookTableData>) => void,
    className: string,
): ReactElement => {
    prepareRow(row);
    return (
        <OrderBookTableRow
            key={row.id}
            row={row}
            volume={row.volume}
            className={className}
        />
    );
};

/**
 * Adds volume data to each order book data item.
 *
 * @param data Data.
 * @param maxVolume Max volume.
 * @returns Data with voulmes.
 */
const getDataWithVolumes = (
    data: Row<OrderBookTableData>[],
    maxVolume: number,
): RowWithVolume[] => {
    let count = 0;

    const finalData = data.map(x => {
        count = count + x.values.ordersAmount;

        return {
            ...x,
            volume: 100 - ((maxVolume - count) / maxVolume) * 100,
        };
    });

    return finalData;
};

/**
 * Creates react table sort by provided field fucntion.
 *
 * @param firstRow First row.
 * @param  secondRow Second row.
 * @param columnId Sorted column id.
 * @returns Sort function.
 */
const customSortFunction: SortByFn<OrderBookTableData> = (firstRow, secondRow, columnId) => {
    const firstValue = firstRow.values[columnId];
    const secondValue = secondRow.values[columnId];

    if (firstValue === secondValue) {
        return 0;
    }

    return firstValue - secondValue > 0 ? -1 : 1;
};
