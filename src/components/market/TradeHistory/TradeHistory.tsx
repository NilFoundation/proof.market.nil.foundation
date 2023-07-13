/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { memo } from 'react';
import { Spinner } from '@nilfoundation/react-components';
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

/**
 * Renders trade history view, based on loading/data state.
 */
const TradeHistoryViewFactory = memo(function TradeHistoryViewFactory({
    selectedStatementKey,
    loadingStatements,
}: {
    selectedStatementKey?: string;
    loadingStatements: boolean;
}) {
    switch (true) {
        case loadingStatements && selectedStatementKey === undefined:
            return <Spinner grow />;
        case selectedStatementKey === undefined:
            return <h5>Select statement to display trade history.</h5>;
        case selectedStatementKey !== undefined:
            return (
                <TradeHistoryTable
                    key={selectedStatementKey}
                    selectedStatementKey={selectedStatementKey!}
                />
            );
        default:
            return <></>;
    }
});
