/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { memo, useCallback, useMemo } from 'react';
import { ListGroup } from '@nilfoundation/react-components';
import { dequal as deepEqual } from 'dequal';
import type { TableInstance, TableState } from 'react-table';
import type { Option } from 'baseui/select';
import { Select } from 'baseui/select';
import { selectAllStatementsTags, useAppSelector } from '@/redux';
import { ReactTable } from '@/components';
import type { Statement, StatementsListData, StatementsListTableColumn } from '@/models';
import { useLocalStorage } from '@/hooks';
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
    {
        accessor: 'tag',
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
    hiddenColumns: ['change', 'cost', 'id', 'tag'],
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
    const avialiableTags = useAppSelector(selectAllStatementsTags);
    const selectOptions: Option[] = useMemo(() => {
        return avialiableTags.map(x => ({ label: x, id: x }));
    }, [avialiableTags]);

    const [tags, setTags] = useLocalStorage<Option[]>('selectedStatementsTags', []);

    const tableData: StatementsListData[] = useMemo(() => {
        return statementsList
            .filter(x => (tags.length > 0 ? tags.some(y => y.id === x.tag) : true))
            .map(x => {
                const info = statementsInfo && statementsInfo.find(y => y._key === x._key);

                return {
                    _key: x._key,
                    name: x.name,
                    cost: info?.current,
                    change: info?.daily_change,
                    tag: x.tag,
                };
            });
    }, [statementsList, statementsInfo, tags]);

    const renderRows = useCallback(
        ({ rows, prepareRow, visibleColumns }: TableInstance<StatementsListData>) => (
            <>
                {visibleColumns.find(x => x.canFilter)?.render('Filter')}
                <Select
                    options={selectOptions}
                    value={tags}
                    multi
                    onChange={params => setTags(params.value as Option[])}
                    placeholder="Select statements tags"
                />
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
                                    isTagSelected={tags.includes(row.values.tag)}
                                />
                            );
                        })
                    )}
                </ListGroup>
            </>
        ),
        [tags, setTags, selectOptions],
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
