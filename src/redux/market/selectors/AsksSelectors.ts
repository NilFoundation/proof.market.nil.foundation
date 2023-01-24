/**
 * @file Selectors.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createSelector } from '@reduxjs/toolkit';
import { Ask } from 'src/models';
import { RootStateType } from 'src/redux';

/**
 * Select all asks from state.
 *
 * @param s State.
 * @returns All asks.
 */
export const selectAsksList = (s: RootStateType): Ask[] => s.asksState.asks;

/**
 * Select all user asks.
 *
 * @param s State.
 * @returns User asks.
 */
export const selectCurrentUserAsks = (s: RootStateType): Ask[] => s.asksState.userAsks;

/**
 * Select all completed asks.
 */
export const selectCompletedAsks = createSelector(selectAsksList, asks =>
    asks.filter(x => x.status === 'completed'),
);

/**
 * Select asks, created by current user with 'created' status.
 */
export const selectCurrentUserActiveAsks = createSelector(selectCurrentUserAsks, asks =>
    asks.filter(x => x.status === 'created' || x.status === 'processing'),
);

/**
 * Select asks, created by current user with 'compelted' status.
 */
export const selectCurrentUserCompletedAsks = createSelector(selectCurrentUserAsks, asks =>
    asks.filter(x => x.status === 'completed'),
);
