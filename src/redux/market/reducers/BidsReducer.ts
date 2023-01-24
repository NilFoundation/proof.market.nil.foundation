/**
 * @file Reducer.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createReducer } from '@reduxjs/toolkit';
import { Bid } from 'src/models';
import {
    UpdateBidsList,
    AddBid,
    UpdateBidsError,
    UpdateIsLoadingBids,
    RemoveBid,
    UpdateUserBidsList,
} from '../actions';

/**
 * State.
 */
export type BidsReducerState = {
    bids: Bid[];
    userBids: Bid[];
    isLoading: boolean;
    error: boolean;
};

/**
 * Initial state.
 */
const initialState: BidsReducerState = {
    bids: [],
    userBids: [],
    isLoading: false,
    error: false,
};

/**
 * Reducer of bids.
 */
export const BidsReducer = createReducer(initialState, builder =>
    builder
        .addCase(UpdateBidsList, (state, { payload }) => ({
            ...state,
            bids: payload,
        }))
        .addCase(UpdateUserBidsList, (state, { payload }) => ({
            ...state,
            userBids: payload,
        }))
        .addCase(AddBid, (state, { payload }) => {
            state.userBids.push(payload);
        })
        .addCase(UpdateIsLoadingBids, (state, { payload }) => ({
            ...state,
            isLoading: payload,
        }))
        .addCase(UpdateBidsError, (state, { payload }) => ({
            ...state,
            error: payload,
        }))
        .addCase(RemoveBid, (state, { payload }) => ({
            ...state,
            asks: state.bids.filter(x => payload !== x._key),
        })),
);
