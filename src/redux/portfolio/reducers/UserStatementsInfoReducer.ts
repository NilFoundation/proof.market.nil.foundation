/**
 * @file Reducer.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { createReducer } from '@reduxjs/toolkit';
import type { UserStatementInfo } from '@/models';
import {
    UpdateUserStatementsInfo,
    UpdateIsErrorUserStatementsInfo,
    UpdateSelectedUserStatementsInfoKey,
    UpdateIsLoadingUserStatementsInfo,
} from '../actions';

/**
 * State.
 */
export type UserStatementsInfoReducerState = {
    userStatementInfo: UserStatementInfo[];
    isLoading: boolean;
    isError: boolean;
    selectedUserStatementInfoKey?: UserStatementInfo['_key'];
};

/**
 * Initial state.
 */
const initialState: UserStatementsInfoReducerState = {
    userStatementInfo: [],
    isLoading: false,
    isError: false,
    selectedUserStatementInfoKey: undefined,
};

/**
 * Reducer of user statements info.
 */
export const UserStatementsInfoReducer = createReducer(initialState, builder =>
    builder
        .addCase(UpdateUserStatementsInfo, (state, { payload }) => ({
            ...state,
            userStatementInfo: payload,
        }))
        .addCase(UpdateIsErrorUserStatementsInfo, (state, { payload }) => {
            state.isError = payload;
        })
        .addCase(UpdateIsLoadingUserStatementsInfo, (state, { payload }) => {
            state.isLoading = payload;
        })
        .addCase(UpdateSelectedUserStatementsInfoKey, (s, { payload }) => {
            if (s.userStatementInfo.some(x => x._key === payload)) {
                s.selectedUserStatementInfoKey = payload;
            }
        }),
);
