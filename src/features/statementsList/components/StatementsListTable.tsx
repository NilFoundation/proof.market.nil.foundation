/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { memo, useState } from 'react';
import { useStyletron } from 'styletron-react';
import type { Statement } from '@/models';
import { getRuntimeConfigOrThrow } from '@/utils';
import { globalStyles as s } from '@/styles/globalStyles';
import { ListItem } from './ListItem';
import { TextFilter } from './TextFilter';
import { TagsSelector } from './TagsSelector';
import { useStatementsListData } from '../hooks/useStatementsListData';

const { CIRCUIT_DEVELOPER_GUIDE_URL } = getRuntimeConfigOrThrow();

/**
 * Props.
 */
type StatementsListTableProps = {
  statementsList: Statement[];
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
  const [filterValue, setFilterValue] = useState('');
  const { listData } = useStatementsListData(statementsList, filterValue);

  return (
    <>
      <TextFilter setFilterValue={setFilterValue} />
      <TagsSelector />
      {listData.length === 0 ? (
        <EmptyList />
      ) : (
        listData.map(data => {
          return (
            <ListItem
              key={data._key}
              data={data}
            />
          );
        })
      )}
    </>
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
