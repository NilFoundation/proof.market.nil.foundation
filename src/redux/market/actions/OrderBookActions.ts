/**
 * @file Redux action creators.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { createAction } from '@reduxjs/toolkit';
import type { OrderBookPriceStep } from '@/enums';
import type { LastOrderData, OrderBookData } from '@/models';

/**
 * Update orderbook data.
 */
export const UpdateOrderBookData = createAction<OrderBookData>('@orderBook/UPDATE_DATA');

/**
 * Update orderbook data loading state.
 */
export const UpdateOrderBookDataIsLoading = createAction<boolean>(
    '@orderBook/UPDATE_DATA_IS_LOADING',
);

/**
 * Update orderbook data error.
 */
export const UpdateOrderBookDataError = createAction<boolean>('@orderBook/UPDATE_IS_ERROR');

/**
 * Update orderbook price step.
 */
export const UpdateOrderBookPriceStep = createAction<keyof typeof OrderBookPriceStep>(
    '@orderBook/UPDATE_PRICE_STEP',
);

/**
 * Update orderbook last order data.
 */
export const UpdateOrderBookLastOrderData = createAction<LastOrderData | undefined>(
    '@orderBook/UPDATE_LAST_ORDER_DATA',
);
