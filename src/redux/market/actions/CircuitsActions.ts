/**
 * @file Redux action creators.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createAction } from '@reduxjs/toolkit';
import { Circuit, CircuitInfo, CircuitStats } from 'src/models';

/**
 * Update circuits list.
 */
export const UpdateCircuitsList = createAction<Circuit[]>('@circuits/UPDATE_CIRCUITS_LIST');

/**
 * Update selected circuit id.
 */
export const UpdateSelectedCircuitId = createAction<number>('@circuits/UPDATE_SELECTED_CIRCUIT_ID');

/**
 * Update circuits loading state.
 */
export const UpdateIsLoadingCircuits = createAction<boolean>('@circuits/UPDATE_IS_LOADING');

/**
 * Update circuits error state.
 */
export const UpdateCircuitsError = createAction<boolean>('@circuits/UPDATE_ERROR');

/**
 * Update circuit info list.
 */
export const UpdateCircuitsInfoList = createAction<CircuitInfo[]>('@circuits/UPDATE_CIRCUITS_INFO');

/**
 * Update circuit info loading state.
 */
export const UpdateIsLoadingCircuitsInfo = createAction<boolean>(
    '@circuits/UPDATE_IS_LOADING_CIRCUITS_INFO',
);

/**
 * Update circuit stats.
 */
export const UpdateCircuitsStats = createAction<CircuitStats[]>('@circuits/UPDATE_STATS');

/**
 * Update circuit stats loading state.
 */
export const UpdateIsLoadingCircuitsStats = createAction<boolean>(
    '@circuits/UPDATE_IS_LOADING_CIRCUITS_STATS',
);

/**
 * Update last proof producer.
 */
export const UpdateLastProofProducer = createAction<
    Array<{ circuit_id: string; sender: string }> | undefined
>('@circuits/UPDATE_LAST_PROOF_PRODUCER');
