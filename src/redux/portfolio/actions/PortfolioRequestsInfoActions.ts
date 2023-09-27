/**
 * @file Redux action creators.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { createAction } from '@reduxjs/toolkit';
import type { PortfolioRequestsInfo } from '@/models';

/**
 * Update portfolio requests info.
 */
export const UpdatePortfolioRequestsInfo = createAction<PortfolioRequestsInfo[]>(
  '@portfolioRequestsInfo/UPDATE',
);

/**
 * Update portfolio requests info loading state.
 */
export const UpdateIsLoadingPortfolioRequestsInfo = createAction<boolean>(
  '@portfolioRequestsInfo/UPDATE_IS_LOADING',
);

/**
 * Update portfolio requests info error state.
 */
export const UpdateIsErrorPortfolioRequestsInfo = createAction<boolean>(
  '@portfolioRequestsInfo/UPDATE_ERROR',
);

/**
 * Update selected portfolio requests info key.
 */
export const UpdateSelectedPortfolioRequestsInfoKey = createAction<PortfolioRequestsInfo['_key']>(
  '@portfolioRequestsInfo/UPDATE_SELECTED_KEY',
);
