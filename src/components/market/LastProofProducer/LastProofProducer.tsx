/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { memo } from 'react';
import { Spinner } from '@nilfoundation/react-components';
import { DashboardCard } from 'src/components';
import { useAppSelector } from 'src/redux';
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
                x => x?.statement_key === `${s.circuitsState.selectedKey}`,
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

/**
 * Renders last proof producer data.
 */
const LastProofProducerViewFactory = memo(function LastProofProducerViewFactory({
    loadingData,
    errorGettingData,
    lastProofProducer,
}: {
    loadingData: boolean;
    errorGettingData: boolean;
    lastProofProducer?: string;
}) {
    switch (true) {
        case loadingData && !lastProofProducer:
            return <Spinner grow />;
        case !!lastProofProducer:
            return (
                <h5>
                    <span className="text-muted">Username:</span>
                    {` ${lastProofProducer}`}
                </h5>
            );
        case errorGettingData && !lastProofProducer:
            return <h5>No last proof producer data was found.</h5>;
        case !lastProofProducer:
        default:
            return <h5>No last proof producer data was found.</h5>;
    }
});
