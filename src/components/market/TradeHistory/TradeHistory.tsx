/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Spinner } from '@nilfoundation/react-components';
import { P, match } from 'ts-pattern';
import { selectCurrentStatementKey, useAppSelector } from '@/redux';
import { DashboardCard } from '../../common';
import { TradeHistoryTable } from './TradeHistoryTable';
import styles from './TradeHistory.module.scss';

/**
 * Trade history component.
 *
 * @returns React component.
 */
export const TradeHistory = (): ReactElement => {
  const selectedStatementKey = useAppSelector(selectCurrentStatementKey);
  const loadingStatements = useAppSelector(s => s.statementsState.isLoading);

  return (
    <DashboardCard>
      <h4>Trades</h4>
      <div className={styles.container}>
        <TradeHistoryViewFactory
          loadingStatements={loadingStatements}
          selectedStatementKey={selectedStatementKey}
        />
      </div>
    </DashboardCard>
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
    .with([true, undefined], () => <Spinner grow />)
    .with([false, undefined], () => <h5>Select statement to display trade history.</h5>)
    .with([P._, P.string], ([, selectedStatementKey]) => (
      <TradeHistoryTable
        key={selectedStatementKey}
        selectedStatementKey={selectedStatementKey}
      />
    ))
    .otherwise(() => <></>);
};
