/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { memo, useCallback, useMemo } from 'react';
import { ListGroup } from '@nilfoundation/react-components';
import { dequal as deepEqual } from 'dequal';
import type { TableInstance, TableState } from 'react-table';
import type { Option } from 'baseui/select';
import { Select } from 'baseui/select';
import { useDispatch } from 'react-redux';
import { UpdateSelectedStatementTags, selectAllStatementsTags, useAppSelector } from '@/redux';
import { ReactTable } from '@/components';
import type { Statement, StatementsListData, StatementsListTableColumn } from '@/models';
import { getRuntimeConfigOrThrow } from '@/utils';
import { CurcuitsListItem } from './StatementsListItem';
import { StatementsListTextFilter } from './StatementsListTextFilter';
import styles from './StatementsList.module.scss';

const { CIRCUIT_DEVELOPER_GUIDE_URL } = getRuntimeConfigOrThrow();

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
  const dispatch = useDispatch();
  const statementsInfo = useAppSelector(s => s.statementsState.statementsInfo, deepEqual);
  const avialiableTags = useAppSelector(selectAllStatementsTags);
  const selectedTags = useAppSelector(s => s.statementsState.selectedStatementTags);

  const selectOptions: Option[] = useMemo(() => {
    return avialiableTags.map(x => ({ label: x, id: x }));
  }, [avialiableTags]);
  const selectValues: Option[] = useMemo(() => {
    return selectedTags.map(x => ({ label: x, id: x }));
  }, [selectedTags]);

  const tableData: StatementsListData[] = useMemo(() => {
    return statementsList.map(x => {
      const info = statementsInfo && statementsInfo.find(y => y._key === x._key);

      return {
        _key: x._key,
        name: x.name,
        cost: info?.current,
        change: info?.daily_change,
        tag: x.tag,
      };
    });
  }, [statementsList, statementsInfo]);

  const renderRows = useCallback(
    ({ rows, prepareRow, visibleColumns }: TableInstance<StatementsListData>) => (
      <>
        {visibleColumns.find(x => x.canFilter)?.render('Filter')}
        <Select
          options={selectOptions}
          value={selectValues}
          multi
          onChange={params => {
            dispatch(UpdateSelectedStatementTags(params.value.map(x => x.id as string)));
          }}
          placeholder="Select statements tags"
        />
        <ListGroup className={styles.listGroup}>
          {rows.length === 0 ? (
            <>
              <div className="text-muted">No statements found</div>
              <div className="text-muted">
                Create your own statement using{' '}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={CIRCUIT_DEVELOPER_GUIDE_URL}
                >
                  this guide
                </a>
              </div>
            </>
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
    [selectValues, dispatch, selectOptions],
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
