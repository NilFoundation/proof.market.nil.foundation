/**
 * @file Redux action creators.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { createAction } from '@reduxjs/toolkit';
import type { AuthType } from '@/enums';

/**
 * Update auth type.
 */
export const UpdateAuthType = createAction<AuthType | undefined>('@auth/UPDATE_TYPE');

/**
 * Update is user authorized.
 */
export const UpdateIsAuthorized = createAction<boolean>('@auth/UPDATE_IS_AUTHORIZED');
