/**
 * @file React hook.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { dequal as deepEqual } from 'dequal';
import sum from 'lodash/sum';
import round from 'lodash/round';
import { Ask, Bid, CostAndEvalTime, LastOrderData, OrderBookTableData } from 'src/models';
import {
    selectBidsList,
    selectAsksList,
    useAppSelector,
    selectCurrentUserAsks,
    selectCurrentUserBids,
} from 'src/redux';
import { OrderBookPriceStep } from 'src/enums';

/**
 * Hook props.
 */
export type UseGetOrderBookDataProps = {
    priceStep: keyof typeof OrderBookPriceStep;
    itemsLimit?: number;
};

/**
 * Hook return type.
 */
export type UseGetOrderBookDataReturnType = {
    bids: OrderBookTableData[];
    asks: OrderBookTableData[];
    loadingBids: boolean;
    loadingAsks: boolean;
    isError: boolean;
    lastOrderData?: LastOrderData;
    maxVolume: number;
};

/**
 * Groupped orders map.
 */
type GrouppedOrdersMap = Map<string, Array<Bid | Ask>>;

/**
 * Hook to get order book data structured for rendering table.
 *
 * @param {UseGetOrderBookDataProps} props - Orderbook props.
 * @returns Data to render order book table.
 */
export const useGetOrderBookData = ({
    priceStep,
    itemsLimit = 25,
}: UseGetOrderBookDataProps): UseGetOrderBookDataReturnType => {
    const loadingBids = useAppSelector(s => s.bidsState.isLoading);
    const loadingAsks = useAppSelector(s => s.asksState.isLoading);
    const asks = useSelector(selectAsksList, deepEqual);
    const bids = useSelector(selectBidsList, deepEqual);
    const userAsks = useSelector(selectCurrentUserAsks, deepEqual);
    const userBids = useSelector(selectCurrentUserBids, deepEqual);
    const isError = useAppSelector(s => s.asksState.error || s.bidsState.error);

    const lastOrderData: LastOrderData = useMemo(() => getLastOrderData(asks), [asks]);

    /**
     * Takes orders array and returns dict, where keys are costs, and values are arrays of orders.
     *
     * @param previousValue Initial value.
     * @param currentValue Current value.
     * @returns Orders, grouped by date.
     */
    const reduceOrdersByCostAndEvalTime = useCallback(
        (previousValue: GrouppedOrdersMap, currentValue: Ask | Bid) => {
            const precision = OrderBookPriceStep[priceStep];
            const mapKey = JSON.stringify({
                cost: round(currentValue.cost, precision),
                eval_time: currentValue.eval_time
                    ? round(currentValue.eval_time, precision)
                    : undefined,
            });

            const value = previousValue.get(mapKey);

            if (!value) {
                previousValue.set(mapKey, [currentValue]);
            } else {
                previousValue.set(mapKey, [...value, currentValue]);
            }

            return previousValue;
        },
        [priceStep],
    );

    const asksData = useMemo(() => {
        return createOrderBookData(
            [...new Map([...asks, ...userAsks].map(x => [x._key, x])).values()]
                .filter(x => x.status === 'created')
                .reduce(reduceOrdersByCostAndEvalTime, new Map()),
            'ask',
            userAsks,
        ).slice(-itemsLimit);
    }, [asks, userAsks, itemsLimit, reduceOrdersByCostAndEvalTime]);

    const bidsData = useMemo(() => {
        return createOrderBookData(
            [...new Map([...bids, ...userBids].map(x => [x._key, x])).values()]
                .filter(x => x.status === 'created')
                .reduce(reduceOrdersByCostAndEvalTime, new Map()),
            'bid',
            userBids,
        ).slice(0, itemsLimit);
    }, [bids, userBids, itemsLimit, reduceOrdersByCostAndEvalTime]);

    const maxVolume = useMemo(
        () =>
            Math.max(
                sum(asksData.map(x => x.ordersAmount)) ?? 0,
                sum(bidsData.map(x => x.ordersAmount)) ?? 0,
            ),
        [asksData, bidsData],
    );

    return {
        asks: asksData,
        bids: bidsData,
        loadingBids,
        loadingAsks,
        isError,
        lastOrderData,
        maxVolume,
    };
};

/**
 * Map groupped trade orders to order book data.
 *
 * @param grouppedOrders Trade orders.
 * @param orderType Bid or Ask.
 * @param userOrders - Orders, created by user.
 * @returns Order book data.
 */
const createOrderBookData = <T extends Bid | Ask>(
    grouppedOrders: GrouppedOrdersMap,
    orderType: 'bid' | 'ask',
    userOrders: T[],
): OrderBookTableData[] => {
    const result: OrderBookTableData[] = [];

    grouppedOrders.forEach((value, key) => {
        const parsedKey: CostAndEvalTime = JSON.parse(key);

        result.push({
            cost: parsedKey?.cost,
            eval_time: parsedKey?.eval_time,
            ordersAmount: value.length,
            type: orderType,
            userOrdersAmount: value.filter(x => userOrders.some(y => y._key === x._key)).length,
        });
    });

    return result;
};

/**
 * Counts current price value and price changing direction.
 *
 * @param currentAsks Current ask list.
 * @see {CurrentPrice}
 * @returns Current price.
 */
const getLastOrderData = (currentAsks: Ask[]): LastOrderData => {
    const completedAsks = currentAsks.filter(x => x.status === 'completed');

    const latestCost = completedAsks.at(-1)?.cost;
    const prevCost = completedAsks.at(-2)?.cost;

    const getType = () => (latestCost! > prevCost! ? 'grow' : 'loss');
    const type = latestCost && prevCost ? getType() : undefined;

    return {
        cost: latestCost,
        eval_time: completedAsks.at(-1)?.eval_time,
        type,
    };
};
