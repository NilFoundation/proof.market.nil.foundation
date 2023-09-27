/**
 * @file Selectors.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { createSelector } from '@reduxjs/toolkit';
import type { Proposal } from '@/models';
import type { RootStateType } from '@/redux';

/**
 * Select charts data.
 *
 * @param s State.
 * @returns Chart data.
 */
const selectChartData = (s: RootStateType): Proposal[] => s.chartsState.data;

/**
 * Select charts data.
 *
 * @param s State.
 * @returns Chart data.
 */
export const selectSortedChartData = createSelector(selectChartData, data =>
  [...data].sort(sortProposalsByUpdatedOnAsc),
);

function sortProposalsByUpdatedOnAsc(a: Proposal, b: Proposal) {
  if (!a.updatedOn || !b.updatedOn) {
    return 0;
  }

  return a.updatedOn - b.updatedOn;
}
