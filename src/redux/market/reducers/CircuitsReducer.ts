/**
 * @file Reducer.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createReducer } from '@reduxjs/toolkit';
import { Circuit, CircuitInfo, CircuitStats, LastProofProducer } from 'src/models';
import {
    UpdateCircuitsList,
    UpdateSelectedCircuitId,
    UpdateIsLoadingCircuits,
    UpdateCircuitsError,
    UpdateCircuitsInfoList,
    UpdateIsLoadingCircuitsInfo,
    UpdateCircuitsStats,
    UpdateIsLoadingCircuitsStats,
    UpdateLastProofProducer,
} from '../actions';

/**
 * State.
 */
export type CircuitsReducerState = {
    circuits: Circuit[];
    selectedid?: string;
    isLoading: boolean;
    error?: boolean;
    circuitsInfo: CircuitInfo[];
    isLoadingCircuitsInfo: boolean;
    circuitsStats: CircuitStats[];
    isLoadingCircuitsStats: boolean;
    lastProofProducer?: Array<LastProofProducer | null>;
};

/**
 * Initial state.
 */
const initialState: CircuitsReducerState = {
    circuits: [],
    selectedid: undefined,
    isLoading: false,
    error: false,
    circuitsInfo: [],
    isLoadingCircuitsInfo: false,
    circuitsStats: [],
    isLoadingCircuitsStats: false,
    lastProofProducer: undefined,
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
        .addCase(UpdateSelectedCircuitId, (state, { payload }) => {
            if (state.circuits.some(x => x._key === payload)) {
                state.selectedid = payload;
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
        }))
        .addCase(UpdateLastProofProducer, (state, { payload }) => {
            state.lastProofProducer = payload;
        }),
);
