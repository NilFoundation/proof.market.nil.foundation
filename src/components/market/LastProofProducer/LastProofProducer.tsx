/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Spinner } from '@nilfoundation/react-components';
import { P, match } from 'ts-pattern';
import { DashboardCard } from '@/components';
import { useAppSelector } from '@/redux';
import styles from './LastProofProdcuer.module.scss';

/**
 * Displays last proof producer.
 *
 * @returns React component.
 */
export const LastProofProducer = (): ReactElement => {
  const loadingData = useAppSelector(s => s.lastProofProducerState.isLoading);
  const errorGettingData = useAppSelector(s => s.lastProofProducerState.isError);
  const lastProofProducer = useAppSelector(
    s =>
      s.lastProofProducerState.data?.find(
        x => x?.statement_key === `${s.statementsState.selectedKey}`,
      )?.sender,
  );

  return (
    <DashboardCard className={styles.container}>
      <h4>Last proof producer:</h4>
      <LastProofProducerViewFactory
        loadingData={loadingData}
        errorGettingData={errorGettingData}
        lastProofProducer={lastProofProducer}
      />
    </DashboardCard>
  );
};

const LastProofProducerViewFactory = function LastProofProducerViewFactory({
  loadingData,
  errorGettingData,
  lastProofProducer,
}: {
  loadingData: boolean;
  errorGettingData: boolean;
  lastProofProducer?: string;
}) {
  return match([loadingData, errorGettingData, lastProofProducer])
    .with([true, false, undefined], () => <Spinner grow />)
    .with([P._, true, undefined], () => <h5>Error while getting data.</h5>)
    .with([false, false, P._], () => (
      <h5>
        <span className="text-muted">Username:</span>
        {` ${lastProofProducer}`}
      </h5>
    ))
    .otherwise(() => <h5>No last proof producer data was found.</h5>);
};
