/**
 * @file Selectors.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { createSelector } from '@reduxjs/toolkit';
import type { Proposal } from '@/models';
import type { RootStateType } from '@/redux';

/**
 * Select all user proposals.
 *
 * @param s State.
 * @returns All proposals.
 */
export const selectUserProposals = (s: RootStateType): Proposal[] => s.userOrdersState.proposals;

/**
 * Select all user requests.
 *
 * @param s State.
 * @returns All requests.
 */
export const selectUserRequests = (s: RootStateType): Proposal[] => s.userOrdersState.requests;

/**
 * Select proposals with 'created' or 'processing' status.
 */
export const selectUserActiveProposals = createSelector(selectUserProposals, proposals =>
  proposals.filter(x => x.status === 'created' || x.status === 'processing'),
);

/**
 * Select proposals with 'created' or 'processing' status.
 */
export const selectUserActiveRequests = createSelector(selectUserRequests, requests =>
  requests.filter(x => x.status === 'created' || x.status === 'processing'),
);

/**
 * Select proposals with 'compelted' status.
 */
export const selectUserCompletedProposals = createSelector(selectUserProposals, proposals =>
  proposals.filter(x => x.status === 'completed'),
);

/**
 * Select requests with 'compelted' status.
 */
export const selectUserCompletedRequests = createSelector(selectUserRequests, requests =>
  requests.filter(x => x.status === 'completed'),
);
