/**
 * @file Redux action creators.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { createAction } from '@reduxjs/toolkit';
import type { PortfolioProposalsInfo } from 'src/models';

/**
 * Update portfolio proposals info.
 */
export const UpdatePortfolioProposalsInfo = createAction<PortfolioProposalsInfo[]>(
    '@portfolioProposalsInfo/UPDATE',
);

/**
 * Update  portfolio proposals info loading state.
 */
export const UpdateIsLoadingPortfolioProposalsInfo = createAction<boolean>(
    '@portfolioProposalsInfo/UPDATE_IS_LOADING',
);

/**
 * Update portfolio proposals info error state.
 */
export const UpdateIsErrorPortfolioProposalsInfo = createAction<boolean>(
    '@portfolioProposalsInfo/UPDATE_ERROR',
);

/**
 * Update selected portfolio proposals info key.
 */
export const UpdateSelectedPortfolioProposalsInfoKey = createAction<PortfolioProposalsInfo['_key']>(
    '@portfolioProposalsInfo/UPDATE_SELECTED_KEY',
);
