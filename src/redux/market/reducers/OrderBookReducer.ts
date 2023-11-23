/**
 * @file Reducer.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { createReducer } from '@reduxjs/toolkit';
import type { OrderBookPriceStepType } from '@/enums';
import type { LastOrderData, OrderBookData } from '@/models';
import { LocalStorageAPI } from '@/packages/localStorage';
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

/**
 * Initial state.
 */
const initialState: OrderBookReducerState = {
  data: { proposals: [], requests: [] },
  hasApiError: false,
  isLoading: false,
  priceStep: LocalStorageAPI.getItem('orderBookPriceStep') ?? '0.001',
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

      LocalStorageAPI.setItem('orderBookPriceStep', payload);
    })
    .addCase(UpdateOrderBookLastOrderData, (state, { payload }) => {
      state.lastOrderData = payload;
    }),
);
