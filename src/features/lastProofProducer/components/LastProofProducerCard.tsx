/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { P, match } from 'ts-pattern';
import { Card, Spinner } from '@nilfoundation/ui-kit';
import { useStyletron } from 'styletron-react';
import { useAppSelector } from '@/redux';
import { globalStyles } from '@/styles/globalStyles';
import { getCardOverrides } from './overrides';

/**
 * Displays last proof producer.
 *
 * @returns React component.
 */
const LastProofProducerCard = (): ReactElement => {
  const loadingData = useAppSelector(s => s.lastProofProducerState.isLoading);
  const errorGettingData = useAppSelector(s => s.lastProofProducerState.isError);
  const lastProofProducer = useAppSelector(
    s =>
      s.lastProofProducerState.data?.find(
        x => x?.statement_key === `${s.statementsState.selectedKey}`,
      )?.sender,
  );

  return (
    <Card
      title="Last proof producer"
      headline
      overrides={getCardOverrides()}
    >
      <LastProofProducerViewFactory
        loadingData={loadingData}
        errorGettingData={errorGettingData}
        lastProofProducer={lastProofProducer}
      />
    </Card>
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
  const [css] = useStyletron();

  return match([loadingData, errorGettingData, lastProofProducer])
    .with([true, false, undefined], () => <Spinner animation />)
    .with([P._, true, undefined], () => <h5>Error while getting data.</h5>)
    .with([false, false, P.string], () => (
      <h5>
        <span className={css(globalStyles.textMuted)}>Username:</span>
        {` ${lastProofProducer}`}
      </h5>
    ))
    .otherwise(() => <h5>No last proof producer data was found.</h5>);
};

export default LastProofProducerCard;
