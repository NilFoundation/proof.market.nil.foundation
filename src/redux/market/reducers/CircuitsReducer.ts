/**
 * @file Reducer.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createReducer } from '@reduxjs/toolkit';
import type { Circuit, CircuitInfo, CircuitStats } from 'src/models';
import {
    UpdateCircuitsList,
    UpdateSelectedCircuitKey,
    UpdateIsLoadingCircuits,
    UpdateCircuitsError,
    UpdateCircuitsInfoList,
    UpdateIsLoadingCircuitsInfo,
    UpdateCircuitsStats,
    UpdateIsLoadingCircuitsStats,
} from '../actions';

/**
 * State.
 */
export type CircuitsReducerState = {
    circuits: Circuit[];
    selectedKey?: string;
    isLoading: boolean;
    error?: boolean;
    circuitsInfo: CircuitInfo[];
    isLoadingCircuitsInfo: boolean;
    circuitsStats: CircuitStats[];
    isLoadingCircuitsStats: boolean;
};

/**
 * Initial state.
 */
const initialState: CircuitsReducerState = {
    circuits: [],
    selectedKey: undefined,
    isLoading: false,
    error: false,
    circuitsInfo: [],
    isLoadingCircuitsInfo: false,
    circuitsStats: [],
    isLoadingCircuitsStats: false,
};

/**
 * Reducer of circuits.
 */
export const CircuitsReducer = createReducer(initialState, builder =>
    builder
        .addCase(UpdateCircuitsList, (state, { payload }) => ({
            ...state,
            circuits: payload,
        }))
        .addCase(UpdateSelectedCircuitKey, (state, { payload }) => {
            if (state.circuits.some(x => x._key === payload)) {
                state.selectedKey = payload;
            }
        })
        .addCase(UpdateIsLoadingCircuits, (state, { payload }) => ({
            ...state,
            isLoading: payload,
        }))
        .addCase(UpdateCircuitsError, (state, { payload }) => ({
            ...state,
            error: payload,
        }))
        .addCase(UpdateCircuitsInfoList, (state, { payload }) => ({
            ...state,
            circuitsInfo: payload,
        }))
        .addCase(UpdateIsLoadingCircuitsInfo, (state, { payload }) => ({
            ...state,
            isLoadingCircuitsInfo: payload,
        }))
        .addCase(UpdateCircuitsStats, (state, { payload }) => ({
            ...state,
            circuitsStats: payload,
        }))
        .addCase(UpdateIsLoadingCircuitsStats, (state, { payload }) => ({
            ...state,
            isLoadingCircuitsStats: payload,
        })),
);
