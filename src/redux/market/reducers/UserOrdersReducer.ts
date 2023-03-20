/**
 * @file Reducer.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { createReducer } from '@reduxjs/toolkit';
import type { Ask, Bid } from '@/models';
import {
    UpdateUserAsksList,
    UpdateUserBidsList,
    RemoveUserAsk,
    RemoveUserBid,
    AddUserBid,
    UpdateGettingUserOrdersError,
    UpdateIsLoadingUserOrders,
} from '../actions';

/**
 * State.
 */
export type UserOrdersReducerState = {
    asks: Ask[];
    bids: Bid[];
    isLoading: boolean;
    isError: boolean;
};

/**
 * Initial state.
 */
const initialState: UserOrdersReducerState = {
    asks: [],
    bids: [],
    isLoading: false,
    isError: false,
};

/**
 * Reducer of user orders.
 */
export const UserOrdersReducer = createReducer(initialState, builder =>
    builder
        .addCase(UpdateUserAsksList, (state, { payload }) => {
            state.asks = payload;
        })
        .addCase(UpdateUserBidsList, (state, { payload }) => {
            state.bids = payload;
        })
        .addCase(UpdateGettingUserOrdersError, (state, { payload }) => {
            state.isError = payload;
        })
        .addCase(UpdateIsLoadingUserOrders, (state, { payload }) => {
            state.isLoading = payload;
        })
        .addCase(AddUserBid, (state, { payload }) => {
            state.bids.push(payload);
        })
        .addCase(RemoveUserAsk, (state, { payload }) => ({
            ...state,
            asks: state.asks.filter(x => x._key !== payload),
        }))
        .addCase(RemoveUserBid, (state, { payload }) => ({
            ...state,
            asks: state.bids.filter(x => x._key !== payload),
        })),
);
