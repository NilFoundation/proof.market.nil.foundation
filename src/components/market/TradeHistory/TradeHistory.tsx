/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { memo } from 'react';
import { Spinner } from '@nilfoundation/react-components';
import { selectCurrentCircuitKey, useAppSelector } from 'src/redux';
import { DashboardCard } from '../../common';
import { TradeHistoryTable } from './TradeHistoryTable';
import styles from './TradeHistory.module.scss';

/**
 * Trade history component.
 *
 * @returns React component.
 */
export const TradeHistory = (): ReactElement => {
    const selectedCircuitKey = useAppSelector(selectCurrentCircuitKey);
    const loadingCircuits = useAppSelector(s => s.circuitsState.isLoading);

    return (
        <DashboardCard>
            <h4>Trades</h4>
            <div className={styles.container}>
                <TradeHistoryViewFactory
                    loadingCircuits={loadingCircuits}
                    selectedCircuitKey={selectedCircuitKey}
                />
            </div>
        </DashboardCard>
    );
};

/**
 * Renders trade history view, based on loading/data state.
 */
const TradeHistoryViewFactory = memo(function TradeHistoryViewFactory({
    selectedCircuitKey,
    loadingCircuits,
}: {
    selectedCircuitKey?: string;
    loadingCircuits: boolean;
}) {
    switch (true) {
        case loadingCircuits && selectedCircuitKey === undefined:
            return <Spinner grow />;
        case selectedCircuitKey === undefined:
            return <h5>Select circuit to display trade history.</h5>;
        case selectedCircuitKey !== undefined:
            return (
                <TradeHistoryTable
                    key={selectedCircuitKey}
                    selectedCircuitKey={selectedCircuitKey!}
                />
            );
        default:
            return <></>;
    }
});
