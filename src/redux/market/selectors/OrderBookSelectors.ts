/**
 * @file Selectors.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { createSelector } from '@reduxjs/toolkit';
import sum from 'lodash/sum';
import type { OrderBookPriceStep } from '@/enums';
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
export const selectOrderBookPriceStep = (s: RootStateType): keyof typeof OrderBookPriceStep =>
    s.orderBookState.priceStep;

/**
 * Returns orderBook max volume.
 */
export const selectOrderBookMaxVolume = createSelector(selectOrderBookData, ({ asks, bids }) =>
    Math.max(sum(asks.map(x => x.ordersAmount)) ?? 0, sum(bids.map(x => x.ordersAmount)) ?? 0),
);

/**
 * Select last order data.
 *
 * @param s State.
 * @returns Last order data.
 */
export const selectLastOrderData = (s: RootStateType): LastOrderData | undefined =>
    s.orderBookState.lastOrderData;
