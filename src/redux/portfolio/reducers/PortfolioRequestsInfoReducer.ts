/**
 * @file Reducer.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { createReducer } from '@reduxjs/toolkit';
import type { PortfolioRequestsInfo } from 'src/models';
import {
    UpdateIsErrorPortfolioRequestsInfo,
    UpdateIsLoadingPortfolioRequestsInfo,
    UpdatePortfolioRequestsInfo,
    UpdateSelectedPortfolioRequestsInfoKey,
} from '../actions';

/**
 * State.
 */
export type PortfolioRequestsInfoReducerState = {
    info: PortfolioRequestsInfo[];
    isLoading: boolean;
    isError: boolean;
    selectedKey?: PortfolioRequestsInfo['_key'];
};

/**
 * Initial state.
 */
const initialState: PortfolioRequestsInfoReducerState = {
    info: [],
    isLoading: false,
    isError: false,
    selectedKey: undefined,
};

/**
 * Reducer of proof producer info.
 */
export const PortfolioRequestsInfoReducer = createReducer(initialState, builder =>
    builder
        .addCase(UpdatePortfolioRequestsInfo, (state, { payload }) => {
            state.info = payload;
        })
        .addCase(UpdateIsLoadingPortfolioRequestsInfo, (state, { payload }) => {
            state.isLoading = payload;
        })
        .addCase(UpdateIsErrorPortfolioRequestsInfo, (state, { payload }) => {
            state.isError = payload;
        })
        .addCase(UpdateSelectedPortfolioRequestsInfoKey, (s, { payload }) => {
            if (s.info.some(x => x._key === payload)) {
                s.selectedKey = payload;
            }
        }),
);
