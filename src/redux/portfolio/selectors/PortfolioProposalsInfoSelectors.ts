/**
 * @file Selectors.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { createSelector } from '@reduxjs/toolkit';
import type { RootStateType } from '@/redux';

/**
 * Select current selected portfolio proposals info.
 */
export const selectSelectedPortfolioProposalsInfo = createSelector(
  (s: RootStateType) => s.portfolioProposalsInfo.info,
  (s: RootStateType) => s.portfolioProposalsInfo.selectedKey,
  (proposalsInfo, key) => proposalsInfo.find(s => s._key === key),
);
