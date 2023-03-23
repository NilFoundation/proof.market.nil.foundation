/**
 * @file Reducer.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { createReducer } from '@reduxjs/toolkit';
import type { AuthType } from '@/enums';
import { getItemFromLocalStorage } from '@/packages/LocalStorage';
import { UpdateAuthType, UpdateIsAuthorized } from '../actions';

/**
 * State.
 */
export type AuthReducerState = {
    type?: AuthType;
    isAuthorized: boolean;
};

/**
 * Initial state.
 */
const initialState: AuthReducerState = {
    type: getItemFromLocalStorage('authType'),
    isAuthorized: false,
};

/**
 * Reducer of auth state.
 */
export const AuthReducer = createReducer(initialState, builder =>
    builder
        .addCase(UpdateAuthType, (state, { payload }) => {
            state.type = payload;
        })
        .addCase(UpdateIsAuthorized, (state, { payload }) => {
            state.isAuthorized = payload;
        }),
);
