/**
 * @file Reducer.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createReducer } from '@reduxjs/toolkit';
import { Bid } from 'src/models';
import { UpdateBidsList, AddBid, UpdateBidsError, UpdateIsLoadingBids } from '../actions';

/**
 * State.
 */
export type BidsReducerState = {
    bids: Bid[];
    isLoading: boolean;
    error: boolean;
};

/**
 * Initial state.
 */
const initialState: BidsReducerState = {
    bids: [],
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
        .addCase(AddBid, (state, { payload }) => ({
            ...state,
            bids: { ...state.bids, payload },
        }))
        .addCase(UpdateIsLoadingBids, (state, { payload }) => ({
            ...state,
            isLoading: payload,
        }))
        .addCase(UpdateBidsError, (state, { payload }) => ({
            ...state,
            error: payload,
        })),
);