/**
 * @file Redux action creators.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createAction } from '@reduxjs/toolkit';
import { Ask } from 'src/models';

/**
 * Update asks list.
 */
export const UpdateAsksList = createAction<Ask[]>('@asks/UPDATE_ASKS_LIST');

/**
 * Update user asks list.
 */
export const UpdateUserAsksList = createAction<Ask[]>('@asks/UPDATE_USER_ASKS_LIST');

/**
 * Add ask.
 */
export const AddAsk = createAction<Ask>('@asks/ADD_ASK');

/**
 * Update asks loading state.
 */
export const UpdateIsLoadingAsks = createAction<boolean>('@asks/UPDATE_IS_LOADING');

/**
 * Update asks error state.
 */
export const UpdateAsksError = createAction<boolean>('@asks/UPDATE_ERROR');

/**
 * Remove ask.
 */
export const RemoveAsk = createAction<Ask['_key']>('@asks/REMOVE_ASK');
