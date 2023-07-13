/**
 * @file Reducer.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { createReducer } from '@reduxjs/toolkit';
import type { UserBalance } from '@/models';
import {
    UpdateUserBalance,
    UpdateUserBalanceIsLoading,
    UpdateUserBalanceIsLoadingError,
    UpdateUserName,
} from '../actions';

/**
 * State.
 */
export type UserReducerState = {
    name: string | null;
    balance?: UserBalance;
    balanceIsLoading: boolean;
    loadingBalanceError: boolean;
};

/**
 * Initial state.
 */
const initialState: UserReducerState = {
    name: null,
    balance: undefined,
    balanceIsLoading: false,
    loadingBalanceError: false,
};

/**
 * Reducer of user info.
 */
export const UserReducer = createReducer(initialState, builder =>
    builder
        .addCase(UpdateUserName, (state, { payload }) => {
            state.name = payload;
        })
        .addCase(UpdateUserBalance, (state, { payload }) => {
            state.balance = payload;
        })
        .addCase(UpdateUserBalanceIsLoading, (state, { payload }) => {
            state.balanceIsLoading = payload;
        })
        .addCase(UpdateUserBalanceIsLoadingError, (state, { payload }) => {
            state.loadingBalanceError = payload;
        }),
);
