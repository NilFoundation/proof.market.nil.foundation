/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { memo, useCallback, useMemo } from 'react';
import { ListGroup } from '@nilfoundation/react-components';
import { dequal as deepEqual } from 'dequal';
import type { TableInstance, TableState } from 'react-table';
import { useAppSelector } from '@/redux';
import { ReactTable } from '@/components';
import type { Statement, StatementsListData, StatementsListTableColumn } from '@/models';
import { CurcuitsListItem } from './StatementsListItem';
import { StatementsListTextFilter } from './StatementsListTextFilter';
import styles from './StatementsList.module.scss';

/**
 * Props.
 */
type StatementsListTableProps = {
    statementsList: Statement[];
};

/**
 * Table columns.
 */
const columns: StatementsListTableColumn[] = [
    {
        Header: 'Name',
        accessor: 'name',
        Filter: StatementsListTextFilter,
    },
    {
        accessor: 'cost',
        disableFilters: true,
    },
    {
        accessor: 'change',
        disableFilters: true,
    },
    {
        accessor: '_key',
        disableFilters: true,
    },
];

/**
 * Initial table state without user interactions.
 */
const defaultTableState: Partial<TableState<StatementsListData>> = {
    sortBy: [
        {
            id: 'name',
            desc: false,
        },
    ],
    hiddenColumns: ['change', 'cost', 'id'],
};

/**
 * Active orders table.
 *
 * @param {StatementsListTableProps} props Props.
 * @returns React component.
 */
export const StatementsListTable = memo(function StatementsListTable({
    statementsList,
}: StatementsListTableProps): ReactElement {
    const statementsInfo = useAppSelector(s => s.statementsState.statementsInfo, deepEqual);

    const tableData: StatementsListData[] = useMemo(() => {
        return statementsList
            .filter(x => !x.isPrivate)
            .map(x => {
                const info = statementsInfo && statementsInfo.find(y => y._key === x._key);

                return {
                    _key: x._key,
                    name: x.name,
                    cost: info?.current,
                    change: info?.daily_change,
                };
            });
    }, [statementsList, statementsInfo]);

    const renderRows = useCallback(
        ({ rows, prepareRow, visibleColumns }: TableInstance<StatementsListData>) => (
            <>
                {visibleColumns.find(x => x.canFilter)?.render('Filter')}
                <ListGroup className={styles.listGroup}>
                    {rows.length === 0 ? (
                        <span className="text-muted">No statements found</span>
                    ) : (
                        rows.map(row => {
                            prepareRow(row);
                            return (
                                <CurcuitsListItem
                                    key={row.id}
                                    data={row.values as StatementsListData}
                                />
                            );
                        })
                    )}
                </ListGroup>
            </>
        ),
        [],
    );

    return (
        <ReactTable
            name="statementsListTable"
            data={tableData}
            columns={columns}
            renderRows={renderRows}
            initialState={defaultTableState}
            showTableHeader={false}
        />
    );
});