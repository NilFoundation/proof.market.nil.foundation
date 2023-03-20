/**
 * @file React hook.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { dequal as deepEqual } from 'dequal';
import {
    useAppSelector,
    selectUserActiveBids,
    selectUserActiveAsks,
    selectUserCompletedAsks,
    selectUserCompletedBids,
} from 'src/redux';
import { TradeOrderType } from 'src/models';
import type { Ask, Bid, ManageOrdersData } from 'src/models';

/**
 * UseGetManageOrdersData hook return type.
 */
export type UseGetManageOrdersDataReturnType = {
    loadingData: boolean;
    isError: boolean;
    activeOrdersData: ManageOrdersData[];
    historyOrdersData: ManageOrdersData[];
};

/**
 * Get data to render manage orders panel.
 *
 * @returns Data to render manage orders panel.
 */
export const useGetManageOrdersData = (): UseGetManageOrdersDataReturnType => {
    const loadingData = useAppSelector(s => s.userOrdersState.isLoading);
    const activeBids = useSelector(selectUserActiveBids, deepEqual);
    const completedBids = useSelector(selectUserCompletedBids, deepEqual);
    const activeAsks = useSelector(selectUserActiveAsks, deepEqual);
    const completedAsks = useSelector(selectUserCompletedAsks, deepEqual);
    const isError = useAppSelector(s => s.userOrdersState.isError);

    const activeOrdersData = useMemo(() => {
        const mappedAsks = activeAsks.map(x => mapToManageOrdersData(x, TradeOrderType.sell));
        const mappedBids = activeBids.map(x => mapToManageOrdersData(x, TradeOrderType.buy));

        return [...mappedAsks, ...mappedBids];
    }, [activeAsks, activeBids]);

    const historyOrdersData = useMemo(() => {
        const mappedAsks = completedAsks.map(x => mapToManageOrdersData(x, TradeOrderType.sell));
        const mappedBids = completedBids.map(x => mapToManageOrdersData(x, TradeOrderType.buy));

        return [...mappedAsks, ...mappedBids];
    }, [completedAsks, completedBids]);

    return { loadingData, isError, activeOrdersData, historyOrdersData };
};

/**
 * Maps trade orders list to manage orders table data list.
 *
 * @param {Ask | Bid} order - Current order.
 * @param type Type.
 * @returns Manage orders table data list.
 */
const mapToManageOrdersData = <T extends Ask | Bid>(
    { createdOn, matched_time, cost, eval_time, _key, status }: T,
    type: TradeOrderType,
): ManageOrdersData => ({
    init_time: createdOn,
    timestamp: matched_time!,
    cost,
    eval_time,
    type,
    orderId: _key,
    status,
});
