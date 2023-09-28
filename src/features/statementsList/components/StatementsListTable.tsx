/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { memo, useCallback, useMemo } from 'react';
import { dequal as deepEqual } from 'dequal';
import type { TableInstance, TableState } from 'react-table';
import { useStyletron } from 'styletron-react';
import { useAppSelector } from '@/redux';
import { ReactTable } from '@/components';
import type { Statement, StatementsListData, StatementsListTableColumn } from '@/models';
import { getRuntimeConfigOrThrow } from '@/utils';
import { globalStyles as s } from '@/styles/globalStyles';
import { CurcuitsListItem } from './ListItem';
import { TextFilter } from './TextFilter';
import { TagsSelector } from './TagsSelector';

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
    Filter: TextFilter,
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
        <TagsSelector />
        {rows.length === 0 ? (
          <EmptyList />
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

const EmptyList = memo(function EmptyList(): ReactElement {
  const [css] = useStyletron();

  return (
    <>
      <div className={css(s.textMuted)}>No statements found</div>
      <div className={css(s.textMuted)}>
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
  );
});
