/**
 * @file Redux action creators.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { createAction } from '@reduxjs/toolkit';

/**
 * Update is user authorized.
 */
export const UpdateIsAuthorized = createAction<boolean>('@auth/UPDATE_IS_AUTHORIZED');
