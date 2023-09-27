/**
 * @file React hook.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { dequal as deepEqual } from 'dequal';
import {
  useAppSelector,
  selectUserActiveRequests,
  selectUserActiveProposals,
  selectUserCompletedProposals,
  selectUserCompletedRequests,
} from '@/redux';
import type { Proposal, Request, ManageOrdersData } from '@/models';
import { TradeOrderType } from '@/models';

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
  const activeRequests = useSelector(selectUserActiveRequests, deepEqual);
  const completedRequests = useSelector(selectUserCompletedRequests, deepEqual);
  const activeProposals = useSelector(selectUserActiveProposals, deepEqual);
  const completedProposals = useSelector(selectUserCompletedProposals, deepEqual);
  const isError = useAppSelector(s => s.userOrdersState.isError);

  const activeOrdersData = useMemo(() => {
    const mappedProposals = activeProposals.map(x => mapToManageOrdersData(x, TradeOrderType.sell));
    const mappedRequests = activeRequests.map(x => mapToManageOrdersData(x, TradeOrderType.buy));

    return [...mappedProposals, ...mappedRequests];
  }, [activeProposals, activeRequests]);

  const historyOrdersData = useMemo(() => {
    const mappedProposals = completedProposals.map(x =>
      mapToManageOrdersData(x, TradeOrderType.sell),
    );
    const mappedRequests = completedRequests.map(x => mapToManageOrdersData(x, TradeOrderType.buy));

    return [...mappedProposals, ...mappedRequests];
  }, [completedProposals, completedRequests]);

  return { loadingData, isError, activeOrdersData, historyOrdersData };
};

/**
 * Maps trade orders list to manage orders table data list.
 *
 * @param {Proposal | Request} order - Current order.
 * @param type Type.
 * @returns Manage orders table data list.
 */
const mapToManageOrdersData = <T extends Proposal | Request>(
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
