/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { memo, useCallback, useMemo } from 'react';
import type { Row, TableInstance, TableState, SortByFn } from 'react-table';
import type { LastOrderData, OrderBookTableColumn, OrderBookDataItem } from '@/models';
import { selectOrderBookMaxVolume, useAppSelector } from '@/redux';
import { ReactTable } from '@/features/reactTable';
import { OrderBookTableRow } from './OrderBookTableRow';
import styles from './OrderBook.module.scss';

/**
 * Props.
 */
type OrderBookTableProps = {
  type: 'requests' | 'proposals';
  data: OrderBookDataItem[];
  lastOrderData?: LastOrderData;
};

type RowWithVolume = Row<OrderBookDataItem> & { volume: number };

/**
 * Initial table state without user interactions.
 */
const defaultOrderBookState: Partial<TableState<OrderBookDataItem>> = {
  sortBy: [
    {
      id: 'cost',
      desc: true,
    },
  ],
  hiddenColumns: ['userOrdersAmount'],
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
}: OrderBookTableProps): ReactElement {
  const maxVolume = useAppSelector(selectOrderBookMaxVolume);
  const columns = useMemo(
    (): OrderBookTableColumn[] => [
      {
        Header: type === 'proposals' ? 'Proposal' : 'Request',
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
        accessor: 'userOrdersAmount',
      },
    ],
    [type],
  );

  const renderRows = useCallback(
    ({ rows, prepareRow }: TableInstance<OrderBookDataItem>) => {
      return (
        <div className={styles.rowsContainer}>
          {getDataWithVolumes(rows, maxVolume).map(row =>
            renderRow(row, prepareRow, type === 'proposals' ? styles.proposal : styles.request),
          )}
        </div>
      );
    },
    [maxVolume, type],
  );

  return (
    <ReactTable
      name={type === 'proposals' ? 'proposalsTable' : 'requestsTable'}
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
  prepareRow: (r: Row<OrderBookDataItem>) => void,
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
const getDataWithVolumes = (data: Row<OrderBookDataItem>[], maxVolume: number): RowWithVolume[] => {
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
const customSortFunction: SortByFn<OrderBookDataItem> = (firstRow, secondRow, columnId) => {
  const firstValue = firstRow.values[columnId];
  const secondValue = secondRow.values[columnId];

  if (firstValue === secondValue) {
    return 0;
  }

  return firstValue - secondValue > 0 ? 1 : -1;
};
