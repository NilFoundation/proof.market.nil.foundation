/**
 * @file Redux action creators.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createAction } from '@reduxjs/toolkit';
import type { Statement, StatementInfo, StatementStats } from '@/models';

/**
 * Update statements list.
 */
export const UpdateStatementsList = createAction<Statement[]>('@statements/UPDATE_STATEMENTS_LIST');

/**
 * Update selected statement key.
 */
export const UpdateSelectedStatementKey = createAction<string>(
    '@statements/UPDATE_SELECTED_STATEMENT_KEY',
);

/**
 * Update statements loading state.
 */
export const UpdateIsLoadingStatements = createAction<boolean>('@statements/UPDATE_IS_LOADING');

/**
 * Update statements error state.
 */
export const UpdateStatementsError = createAction<boolean>('@statements/UPDATE_ERROR');

/**
 * Update statement info list.
 */
export const UpdateStatementsInfoList = createAction<StatementInfo[]>(
    '@statements/UPDATE_STATEMENTS_INFO',
);

/**
 * Update statement info loading state.
 */
export const UpdateIsLoadingStatementsInfo = createAction<boolean>(
    '@statements/UPDATE_IS_LOADING_STATEMENTS_INFO',
);

/**
 * Update statement stats.
 */
export const UpdateStatementsStats = createAction<StatementStats[]>('@statements/UPDATE_STATS');

/**
 * Update statement stats loading state.
 */
export const UpdateIsLoadingStatementsStats = createAction<boolean>(
    '@statements/UPDATE_IS_LOADING_STATEMENTS_STATS',
);
