/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Spinner } from '@nilfoundation/react-components';
import { useGetOrderBookData, UseGetOrderBookDataReturnType, useLocalStorage } from 'src/hooks';
import { OrderBookPriceStep } from 'src/enums';
import { OrderBookTable } from './OrderBookTable';
import { OrderBookSettingsContext } from './OrderBookSettingsContext';
import { DashboardCard } from '../../common';
import { OrderBookToolbar } from './OrderBookToolbar';
import styles from './OrderBook.module.scss';

/**
 * Order book.
 *
 * @returns React component.
 */
export const OrderBook = (): ReactElement => {
    const [priceStep, setPriceStep] = useLocalStorage<keyof typeof OrderBookPriceStep>(
        'orderBookPriceStep',
        '0.001',
    );
    const [displayUserOrders, setDisplayUserOrders] = useLocalStorage<boolean>(
        'displayUserOrdersInOrderbook',
        true,
    );
    const data = useGetOrderBookData({ priceStep });

    return (
        <DashboardCard>
            <OrderBookSettingsContext.Provider
                value={{ priceStep, setPriceStep, displayUserOrders, setDisplayUserOrders }}
            >
                <div className={styles.header}>
                    <h4>Order book</h4>
                    <OrderBookToolbar disabled={data.loadingAsks || data.loadingBids} />
                </div>
                <div className={styles.orderBook}>{OrderBookViewFactory(data)}</div>
            </OrderBookSettingsContext.Provider>
        </DashboardCard>
    );
};

/**
 * Renders order book view.
 *
 * @param {UseGetOrderBookDataReturnType} props Props.
 * @returns React element.
 */
const OrderBookViewFactory = ({
    asks,
    bids,
    loadingAsks,
    loadingBids,
    isError,
    lastOrderData,
    maxVolume,
}: UseGetOrderBookDataReturnType) => {
    switch (true) {
        case (loadingAsks || loadingBids) && !asks.length && !bids.length:
            return <Spinner grow />;
        case isError:
            return <h5>Error while loading data.</h5>;
        case !!asks.length || !!bids.length:
            return (
                <>
                    <OrderBookTable
                        type="asks"
                        data={asks}
                        maxVolume={maxVolume}
                    />
                    {lastOrderData && (
                        <div className={styles.lastDeal}>
                            <div className={styles.lastDealTitle}>Last deal:</div>
                            {lastOrderData.cost && (
                                <div className={`${lastOrderData.type}TextColor`}>
                                    {`${lastOrderData.cost.toFixed(4)} $`}
                                </div>
                            )}
                        </div>
                    )}
                    <OrderBookTable
                        type="bids"
                        data={bids}
                        maxVolume={maxVolume}
                    />
                </>
            );
        default:
            return <h5>No orders.</h5>;
    }
};
