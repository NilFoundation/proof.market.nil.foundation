/**
 * @file Reducer.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { createReducer } from '@reduxjs/toolkit';
import type { GoogleUserinfo, UserBalance } from '@/models';
import {
    UpdateGoogleUserInfo,
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
    googleUserInfo: GoogleUserinfo | undefined;
};

/**
 * Initial state.
 */
const initialState: UserReducerState = {
    name: null,
    balance: undefined,
    balanceIsLoading: false,
    loadingBalanceError: false,
    googleUserInfo: undefined,
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
        })
        .addCase(UpdateGoogleUserInfo, (state, { payload }) => {
            state.googleUserInfo = payload;
        }),
);
