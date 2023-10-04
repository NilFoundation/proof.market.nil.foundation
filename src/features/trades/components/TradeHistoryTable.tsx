/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { memo } from 'react';
import { Spinner } from '@nilfoundation/ui-kit';
import type { ListChildComponentProps } from 'react-window';
import type { StyleObject } from 'styletron-react';
import { useStyletron } from 'styletron-react';
import { formatDate, renderDashOnEmptyValue } from '@/utils';
import type { Proposal } from '@/models';
import { useInfiniteLoadTrades } from '@/hooks';
import { VirtualList, Table, TRow, TBody, THeader, THead, TCell } from '@/features/shared';
import { globalStyles } from '@/styles/globalStyles';
import { styles as s } from './styles';

/**
 * Props.
 */
type TradeHistoryTableProps = {
  selectedStatementKey: string;
};

/**
 * Table head configuration.
 */
const tradeHistoryTableHeadConfig: Array<Record<'Header', string>> = [
  {
    Header: 'Time',
  },
  {
    Header: 'Cost',
  },
  {
    Header: 'Generation time',
  },
];

/**
 * Trades table.
 *
 * @param {TradeHistoryTableProps} props Props.
 * @returns React component.
 */
export const TradeHistoryTable = memo(function TradeHistoryTable({
  selectedStatementKey,
}: TradeHistoryTableProps): ReactElement {
  const [css] = useStyletron();
  const { items, loadMoreItems, loading, error, hasMore, listRef } = useInfiniteLoadTrades({
    selectedStatementKey,
  });

  const isItemLoaded = (index: number) => !hasMore || !!items.at(index);
  const itemCount = hasMore ? items.length + 1 : items.length;

  const Element = ({ index, style }: ListChildComponentProps<Proposal>) => {
    if (!isItemLoaded(index)) {
      return (
        <TRow style={style}>
          <Spinner animation />
        </TRow>
      );
    }

    const currentItem = items.at(index)!;
    const { cost, generation_time, updatedOn } = currentItem;
    const nextItem = items.at(index + 1);

    const className = nextItem ? css(getRowClass(nextItem, currentItem)) : '';

    return (
      <TRow
        style={style}
        className={className}
        role="row"
      >
        <TCell>{formatDate(updatedOn!, 'DD.MM HH:mm')}</TCell>
        <TCell>{cost.toFixed(4)}</TCell>
        <TCell>{renderDashOnEmptyValue(generation_time)}</TCell>
      </TRow>
    );
  };

  return (
    <Table>
      <THead sticky>
        <TRow>
          {tradeHistoryTableHeadConfig.map(({ Header }, i) => (
            <THeader key={i}>{Header}</THeader>
          ))}
        </TRow>
      </THead>
      <TBody>
        {error && items.length === 0 && <h5>Error while getting trades data.</h5>}
        {!loading && !error && items.length === 0 && <h5>Empty data.</h5>}
        <VirtualList
          isItemLoaded={isItemLoaded}
          itemCount={itemCount}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          loadMoreItems={loading ? () => {} : loadMoreItems}
          height={446}
          itemSize={28}
          className={css(s.list)}
          ref={listRef}
        >
          {Element}
        </VirtualList>
      </TBody>
    </Table>
  );
});

/**
 * Returns classname for row.
 *
 * @param prevItem Previous item.
 * @param currentItem CurrentItem.
 * @returns Style object.
 */
const getRowClass = (prevItem: Proposal, currentItem: Proposal): StyleObject => {
  if (prevItem.cost > currentItem.cost) {
    return globalStyles.dangerText;
  }

  if (prevItem.cost < currentItem.cost) {
    return globalStyles.successText;
  }

  return {};
};
