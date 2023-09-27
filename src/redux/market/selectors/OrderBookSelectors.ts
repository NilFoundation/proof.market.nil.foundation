/**
 * @file Selectors.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { createSelector } from '@reduxjs/toolkit';
import sum from 'lodash/sum';
import type { OrderBookPriceStepType } from '@/enums';
import type { LastOrderData, OrderBookData } from '@/models';
import type { RootStateType } from '@/redux';

/**
 * Select orderBook data.
 *
 * @param s State.
 * @returns Orderbook data.
 */
export const selectOrderBookData = (s: RootStateType): OrderBookData => s.orderBookState.data;

/**
 * Select orderBook price step.
 *
 * @param s State.
 * @returns Orderbook price step.
 */
export const selectOrderBookPriceStep = (s: RootStateType): OrderBookPriceStepType =>
  s.orderBookState.priceStep;

/**
 * Returns orderBook max volume.
 */
export const selectOrderBookMaxVolume = createSelector(
  selectOrderBookData,
  ({ proposals, requests }) =>
    Math.max(
      sum(proposals.map(x => x.ordersAmount)) ?? 0,
      sum(requests.map(x => x.ordersAmount)) ?? 0,
    ),
);

/**
 * Select last order data.
 *
 * @param s State.
 * @returns Last order data.
 */
export const selectLastOrderData = (s: RootStateType): LastOrderData | undefined =>
  s.orderBookState.lastOrderData;
