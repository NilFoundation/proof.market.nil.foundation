/**
 * @file Redux action creators.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createAction } from '@reduxjs/toolkit';
import type { UserBalance } from '@/models';

/**
 * Update current user name.
 */
export const UpdateUserName = createAction<string | null>('@user/UPDATE_NAME');

/**
 * Update current user balance.
 */
export const UpdateUserBalance = createAction<UserBalance | undefined>('@user/UPDATE_BALANCE');

/**
 * Update user balance loading status.
 */
export const UpdateUserBalanceIsLoading = createAction<boolean>('@user/UPDATE_BALANCE_IS_LOADING');

/**
 * Update user balance error status.
 */
export const UpdateUserBalanceIsLoadingError = createAction<boolean>(
    '@user/UPDATE_BALANCE_IS_LOADING_ERROR',
);

/**
 * Set jwt token revalidation timeout.
 */
export const SetJwtRevalidateTimeout = createAction<number>('@user/SET_REVALIDATE_JWT_TIMEOUT');
