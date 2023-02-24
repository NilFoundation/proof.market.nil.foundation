/**
 * @file Reducer.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { createReducer } from '@reduxjs/toolkit';
import type { PortfolioProposalsInfo } from 'src/models';
import {
    UpdateIsErrorPortfolioProposalsInfo,
    UpdateIsLoadingPortfolioProposalsInfo,
    UpdateSelectedPortfolioProposalsInfoKey,
    UpdatePortfolioProposalsInfo,
} from '../actions';

/**
 * State.
 */
export type PortfolioPorposalsInfoReducerState = {
    info: PortfolioProposalsInfo[];
    isLoading: boolean;
    isError: boolean;
    selectedKey?: PortfolioProposalsInfo['_key'];
};

/**
 * Initial state.
 */
const initialState: PortfolioPorposalsInfoReducerState = {
    info: [],
    isLoading: false,
    isError: false,
    selectedKey: undefined,
};

/**
 * Reducer of portfolio proposals info.
 */
export const PortfolioPorposalsInfoReducer = createReducer(initialState, builder =>
    builder
        .addCase(UpdatePortfolioProposalsInfo, (state, { payload }) => {
            state.info = payload;
        })
        .addCase(UpdateIsLoadingPortfolioProposalsInfo, (state, { payload }) => {
            state.isLoading = payload;
        })
        .addCase(UpdateIsErrorPortfolioProposalsInfo, (state, { payload }) => {
            state.isError = payload;
        })
        .addCase(UpdateSelectedPortfolioProposalsInfoKey, (s, { payload }) => {
            if (s.info.some(x => x._key === payload)) {
                s.selectedKey = payload;
            }
        }),
);
