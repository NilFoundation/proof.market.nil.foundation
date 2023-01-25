/**
 * @file Reducer.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createReducer } from '@reduxjs/toolkit';
import { Ask } from 'src/models';
import {
    UpdateAsksList,
    AddAsk,
    UpdateAsksError,
    UpdateIsLoadingAsks,
    RemoveAsk,
    UpdateUserAsksList,
} from '../actions';

/**
 * State.
 */
export type AsksReducerState = {
    asks: Ask[];
    userAsks: Ask[];
    isLoading: boolean;
    error: boolean;
};

/**
 * Initial state.
 */
const initialState: AsksReducerState = {
    asks: [],
    userAsks: [],
    isLoading: false,
    error: false,
};

/**
 * Reducer of asks.
 */
export const AsksReducer = createReducer(initialState, builder =>
    builder
        .addCase(UpdateAsksList, (state, { payload }) => ({
            ...state,
            asks: payload,
        }))
        .addCase(UpdateUserAsksList, (state, { payload }) => ({
            ...state,
            userAsks: payload,
        }))
        .addCase(AddAsk, (state, { payload }) => {
            state.userAsks.push(payload);
        })
        .addCase(UpdateIsLoadingAsks, (state, { payload }) => ({
            ...state,
            isLoading: payload,
        }))
        .addCase(UpdateAsksError, (state, { payload }) => ({
            ...state,
            error: payload,
        }))
        .addCase(RemoveAsk, (state, { payload }) => ({
            ...state,
            asks: state.asks.filter(x => payload !== x._key),
            userAsks: state.userAsks.filter(x => payload !== x._key),
        })),
);
