/**
 * @file Selectors.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createSelector } from '@reduxjs/toolkit';
import { Ask } from 'src/models';
import { RootStateType } from 'src/redux';
import { selectCurrentUser } from '../../login';

/**
 * Select all asks from state.
 *
 * @param s State.
 * @returns All asks.
 */
export const selectAsksList = (s: RootStateType): Ask[] => s.asksState.asks;

/**
 * Select all completed asks.
 */
export const selectCompletedAsks = createSelector(selectAsksList, asks =>
    asks.filter(x => x.status === 'completed'),
);

/**
 * Select asks, created by current user.
 */
export const selectCurrentUserAsks = createSelector(
    selectAsksList,
    selectCurrentUser,
    (asks, user) => asks.filter(x => x.sender === user),
);

/**
 * Select asks, created by current user with 'created' status.
 */
export const selectCurrentUserCreatedAsks = createSelector(selectCurrentUserAsks, asks =>
    asks.filter(x => x.status === 'created'),
);

/**
 * Select asks, created by current user with 'compelted' status.
 */
export const selectCurrentUserCompletedAsks = createSelector(selectCurrentUserAsks, asks =>
    asks.filter(x => x.status === 'completed'),
);
