/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Spinner } from '@nilfoundation/react-components';
import { useGetTradeHistoryData, UseGetTradeHistoryDataReturnType } from 'src/hooks';
import { DashboardCard } from '../../common';
import { TradeHistoryTable } from './TradeHistoryTable';
import styles from './TradeHistory.module.scss';

/**
 * Trade history component.
 *
 * @returns React component.
 */
export const TradeHistory = (): ReactElement => {
    const data = useGetTradeHistoryData();

    return (
        <DashboardCard>
            <h4>Trades</h4>
            <div className={styles.container}>{TradeHistoryViewFactory({ ...data })}</div>
        </DashboardCard>
    );
};

/**
 * Renders trade history view.
 *
 * @param {UseGetTradeHistoryDataReturnType} props Props.
 * @returns React element.
 */
const TradeHistoryViewFactory = ({
    data,
    columns,
    loadingData,
    isError,
}: UseGetTradeHistoryDataReturnType) => {
    switch (true) {
        case loadingData && !data.length:
            return <Spinner grow />;
        case isError:
            return <h5>Error while loading data.</h5>;
        case !!data.length:
            return (
                <TradeHistoryTable
                    data={data}
                    columns={columns}
                />
            );
        default:
            return <h5>Empty history.</h5>;
    }
};
