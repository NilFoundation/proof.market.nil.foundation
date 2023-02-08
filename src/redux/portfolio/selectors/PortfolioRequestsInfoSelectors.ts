/**
 * @file Selectors.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { createSelector } from '@reduxjs/toolkit';
import type { RootStateType } from 'src/redux';

/**
 * Select current selected portfolio requests info.
 */
export const selectSelectedPortfolioRequestsInfo = createSelector(
    (s: RootStateType) => s.portfolioRequestsInfo.info,
    (s: RootStateType) => s.portfolioRequestsInfo.selectedKey,
    (requestsInfo, key) => requestsInfo.find(s => s._key === key),
);
