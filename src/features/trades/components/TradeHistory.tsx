/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { P, match } from 'ts-pattern';
import { Card, Spinner } from '@nilfoundation/ui-kit';
import { useStyletron } from 'styletron-react';
import { selectCurrentStatementKey, useAppSelector } from '@/redux';
import { TradeHistoryTable } from './TradeHistoryTable';
import { getCardOverrides } from './overrides';
import { styles as s } from './styles';

/**
 * Trade history component.
 *
 * @returns React component.
 */
const TradeHistory = (): ReactElement => {
  const selectedStatementKey = useAppSelector(selectCurrentStatementKey);
  const loadingStatements = useAppSelector(s => s.statementsState.isLoading);
  const [css] = useStyletron();

  return (
    <Card
      title="Trades"
      overrides={getCardOverrides()}
      headline
    >
      <div className={css(s.container)}>
        <TradeHistoryViewFactory
          loadingStatements={loadingStatements}
          selectedStatementKey={selectedStatementKey}
        />
      </div>
    </Card>
  );
};

const TradeHistoryViewFactory = ({
  selectedStatementKey,
  loadingStatements,
}: {
  selectedStatementKey?: string;
  loadingStatements: boolean;
}) => {
  return match([loadingStatements, selectedStatementKey])
    .with([true, undefined], () => <Spinner animation />)
    .with([false, undefined], () => <h5>Select statement to display trade history.</h5>)
    .with([P._, P.string], ([, selectedStatementKey]) => (
      <TradeHistoryTable
        key={selectedStatementKey}
        selectedStatementKey={selectedStatementKey}
      />
    ))
    .otherwise(() => <></>);
};

export default TradeHistory;
