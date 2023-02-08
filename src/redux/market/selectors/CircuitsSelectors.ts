/**
 * @file Selectors.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createSelector } from '@reduxjs/toolkit';
import type { RootStateType } from '../../RootStateType';

const selectCircuitsList = (s: RootStateType) => s.circuitsState.circuits;

/**
 * Selects current circuit id.
 *
 * @param s State.
 * @returns Current selected circuit id.
 */
export const selectCurrentCircuitKey = (s: RootStateType): string | undefined =>
    s.circuitsState.selectedKey;

/**
 * Sorted and filtered circuits selector.
 */
export const selectCircuits = createSelector(selectCircuitsList, circuits => circuits);

/**
 * Selected circuit selector.
 */
export const selectCurrentCircuit = createSelector(
    selectCircuits,
    selectCurrentCircuitKey,
    (circuits, selectedid) => circuits.find(x => x._key === selectedid),
);

/**
 * Selected statement name selector.
 */
export const selectCurrentStatementName = createSelector(
    selectCurrentCircuit,
    selectedStatement => selectedStatement?.name,
);
