/**
 * @file Reducer.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { createReducer } from '@reduxjs/toolkit';
import type { OrderBookPriceStepType } from '@/enums';
import type { LastOrderData, OrderBookData } from '@/models';
import { getItemFromLocalStorage, setItemIntoLocalStorage } from '@/packages/LocalStorage';
import {
    UpdateOrderBookData,
    UpdateOrderBookDataError,
    UpdateOrderBookDataIsLoading,
    UpdateOrderBookPriceStep,
    UpdateOrderBookLastOrderData,
} from '../actions';

/**
 * State.
 */
export type OrderBookReducerState = {
    data: OrderBookData;
    isLoading: boolean;
    hasApiError: boolean;
    priceStep: OrderBookPriceStepType;
    lastOrderData?: LastOrderData;
};

const priceStepLocalStorageKey = 'orderBookPriceStep';

/**
 * Initial state.
 */
const initialState: OrderBookReducerState = {
    data: { asks: [], bids: [] },
    hasApiError: false,
    isLoading: false,
    priceStep: getItemFromLocalStorage(priceStepLocalStorageKey) ?? '0.001',
    lastOrderData: undefined,
};

/**
 * Reducer of orderbook state.
 */
export const OrderBookReducer = createReducer(initialState, builder =>
    builder
        .addCase(UpdateOrderBookData, (state, { payload }) => {
            state.data = payload;
        })
        .addCase(UpdateOrderBookDataIsLoading, (state, { payload }) => {
            state.isLoading = payload;
        })
        .addCase(UpdateOrderBookDataError, (state, { payload }) => {
            state.hasApiError = payload;
        })
        .addCase(UpdateOrderBookPriceStep, (state, { payload }) => {
            state.priceStep = payload;

            setItemIntoLocalStorage(priceStepLocalStorageKey, payload);
        })
        .addCase(UpdateOrderBookLastOrderData, (state, { payload }) => {
            state.lastOrderData = payload;
        }),
);
