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
import type { Circuit, CircuitsListData, CircuitsListTableColumn } from '@/models';
import { CurcuitsListItem } from './CircuitsListItem';
import { CircuitsListTextFilter } from './CircuitsListTextFilter';
import styles from './CircuitsList.module.scss';

/**
 * Props.
 */
type CircuitsListTableProps = {
    circuitsList: Circuit[];
};

/**
 * Table columns.
 */
const columns: CircuitsListTableColumn[] = [
    {
        Header: 'Name',
        accessor: 'name',
        Filter: CircuitsListTextFilter,
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
const defaultTableState: Partial<TableState<CircuitsListData>> = {
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
 * @param {CircuitsListTableProps} props Props.
 * @returns React component.
 */
export const CircuitsListTable = memo(function CircuitsListTable({
    circuitsList,
}: CircuitsListTableProps): ReactElement {
    const circuitsInfo = useAppSelector(s => s.circuitsState.circuitsInfo, deepEqual);

    const tableData: CircuitsListData[] = useMemo(() => {
        return circuitsList
            .filter(x => !x.isPrivate)
            .map(x => {
                const info = circuitsInfo && circuitsInfo.find(y => y._key === x._key);

                return {
                    _key: x._key,
                    name: x.name,
                    cost: info?.current,
                    change: info?.daily_change,
                };
            });
    }, [circuitsList, circuitsInfo]);

    const renderRows = useCallback(
        ({ rows, prepareRow, visibleColumns }: TableInstance<CircuitsListData>) => (
            <>
                {visibleColumns.find(x => x.canFilter)?.render('Filter')}
                <ListGroup className={styles.listGroup}>
                    {rows.length === 0 ? (
                        <span className="text-muted">No circuits found</span>
                    ) : (
                        rows.map(row => {
                            prepareRow(row);
                            return (
                                <CurcuitsListItem
                                    key={row.id}
                                    data={row.values as CircuitsListData}
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
            name="circuitsListTable"
            data={tableData}
            columns={columns}
            renderRows={renderRows}
            initialState={defaultTableState}
            showTableHeader={false}
        />
    );
});
