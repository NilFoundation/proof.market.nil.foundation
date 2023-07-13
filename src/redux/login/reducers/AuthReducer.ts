/**
 * @file Reducer.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { createReducer } from '@reduxjs/toolkit';
import { UpdateIsAuthorized } from '../actions';

/**
 * State.
 */
export type AuthReducerState = {
    isAuthorized: boolean;
};

/**
 * Initial state.
 */
const initialState: AuthReducerState = {
    isAuthorized: false,
};

/**
 * Reducer of auth state.
 */
export const AuthReducer = createReducer(initialState, builder =>
    builder.addCase(UpdateIsAuthorized, (state, { payload }) => {
        state.isAuthorized = payload;
    }),
);
