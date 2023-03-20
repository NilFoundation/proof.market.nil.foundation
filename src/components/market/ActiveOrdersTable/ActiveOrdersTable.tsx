/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { createRef, memo, useCallback } from 'react';
import { ListGroup } from '@nilfoundation/react-components';
import type { Column, TableInstance, TableState } from 'react-table';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ReactTable } from '@/components';
import type { ManageOrdersData } from '@/models';
import { ActiveOrdersTableItem } from './ActiveOrdersTableItem';
import styles from './ActiveOrdersTable.module.scss';

/**
 * Props.
 */
type ActiveOrdersTableProps = {
    data: ManageOrdersData[];
};

/**
 * Table columns.
 */
const columns: Column<ManageOrdersData>[] = [
    {
        Header: 'Status',
        accessor: 'status',
    },
    {
        Header: 'Time',
        accessor: 'init_time',
    },
    {
        accessor: 'type',
        disableSortBy: true,
    },
    {
        Header: 'Cost',
        accessor: 'cost',
    },
    {
        Header: 'Gen time',
        accessor: 'eval_time',
    },
    {
        accessor: 'orderId',
        disableSortBy: true,
    },
];

/**
 * Initial table state without user interactions.
 */
const defaultTableState: Partial<TableState<ManageOrdersData>> = {
    sortBy: [
        {
            id: 'status',
            desc: true,
        },
    ],
};

/**
 * Active orders table.
 *
 * @param {ActiveOrdersTableProps} props Props.
 * @returns React component.
 */
export const ActiveOrdersTable = memo(function ActiveOrdersTable({
    data,
}: ActiveOrdersTableProps): ReactElement {
    const renderRows = useCallback(({ rows, prepareRow }: TableInstance<ManageOrdersData>) => {
        return (
            <ListGroup className={styles.listGroup}>
                {rows.length === 0 ? (
                    <span className="text-muted">No orders</span>
                ) : (
                    <TransitionGroup component={null}>
                        {rows.map(row => {
                            prepareRow(row);
                            const nodeRef = createRef<HTMLDivElement>();

                            return (
                                <CSSTransition
                                    key={row.id}
                                    nodeRef={nodeRef}
                                    timeout={300}
                                    classNames="fade"
                                >
                                    <ActiveOrdersTableItem
                                        data={row}
                                        ref={nodeRef}
                                    />
                                </CSSTransition>
                            );
                        })}
                    </TransitionGroup>
                )}
            </ListGroup>
        );
    }, []);

    return (
        <ReactTable
            name="activeOrdersTable"
            className={styles.table}
            data={data}
            columns={columns}
            renderRows={renderRows}
            disableSortRemove={true}
            initialState={defaultTableState}
            showTableHeader={false}
        />
    );
});
