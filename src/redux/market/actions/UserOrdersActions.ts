/**
 * @file Redux action creators.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { createAction } from '@reduxjs/toolkit';
import type { Ask, Bid } from '@/models';

/**
 * Update user asks list.
 */
export const UpdateUserAsksList = createAction<Ask[]>('@userOrders/UPDATE_USER_ASKS');

/**
 * Update user bids list.
 */
export const UpdateUserBidsList = createAction<Bid[]>('@userOrders/UPDATE_USER_BIDS');

/**
 * Update loading state.
 */
export const UpdateIsLoadingUserOrders = createAction<boolean>('@userOrders/UPDATE_IS_LOADING');

/**
 * Update error state.
 */
export const UpdateGettingUserOrdersError = createAction<boolean>('@userOrders/UPDATE_IS_ERROR');

/**
 * Remove user ask.
 */
export const RemoveUserAsk = createAction<Ask['_key']>('@userOrders/REMOVE_ASK');

/**
 * Remove user bid.
 */
export const RemoveUserBid = createAction<Bid['_key']>('@userOrders/REMOVE_BID');

/**
 * Add user bid.
 */
export const AddUserBid = createAction<Bid>('@userOrders/ADD_BID');
