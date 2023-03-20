/**
 * @file Selectors.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { createSelector } from '@reduxjs/toolkit';
import type { Ask } from '@/models';
import type { RootStateType } from '@/redux';

/**
 * Select all user asks.
 *
 * @param s State.
 * @returns All asks.
 */
export const selectUserAsks = (s: RootStateType): Ask[] => s.userOrdersState.asks;

/**
 * Select all user bids.
 *
 * @param s State.
 * @returns All bids.
 */
export const selectUserBids = (s: RootStateType): Ask[] => s.userOrdersState.bids;

/**
 * Select asks with 'created' or 'processing' status.
 */
export const selectUserActiveAsks = createSelector(selectUserAsks, asks =>
    asks.filter(x => x.status === 'created' || x.status === 'processing'),
);

/**
 * Select asks with 'created' or 'processing' status.
 */
export const selectUserActiveBids = createSelector(selectUserBids, bids =>
    bids.filter(x => x.status === 'created' || x.status === 'processing'),
);

/**
 * Select asks with 'compelted' status.
 */
export const selectUserCompletedAsks = createSelector(selectUserAsks, asks =>
    asks.filter(x => x.status === 'completed'),
);

/**
 * Select bids with 'compelted' status.
 */
export const selectUserCompletedBids = createSelector(selectUserBids, bids =>
    bids.filter(x => x.status === 'completed'),
);
