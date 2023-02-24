/**
 * @file Redux action creators.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { createAction } from '@reduxjs/toolkit';
import type { UserStatementInfo } from 'src/models';

/**
 * Update user statements info.
 */
export const UpdateUserStatementsInfo = createAction<UserStatementInfo[]>(
    '@userStatementInfo/UPDATE',
);

/**
 * Update user statement info loading state.
 */
export const UpdateIsLoadingUserStatementsInfo = createAction<boolean>(
    '@userStatementInfo/UPDATE_IS_LOADING',
);

/**
 * Update user statement info error state.
 */
export const UpdateIsErrorUserStatementsInfo = createAction<boolean>(
    '@userStatementInfo/UPDATE_IS_ERROR',
);

/**
 * Update selected user statement info key.
 */
export const UpdateSelectedUserStatementsInfoKey = createAction<UserStatementInfo['_key']>(
    '@userStatementInfo/UPDATE_SELECTED_KEY',
);
