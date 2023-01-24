/**
 * @file Redux action creators.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createAction } from '@reduxjs/toolkit';
import { Bid } from 'src/models';

/**
 * Update bids list.
 */
export const UpdateBidsList = createAction<Bid[]>('@bids/UPDATE_BIDS_LIST');

/**
 * Update user bids list.
 */
export const UpdateUserBidsList = createAction<Bid[]>('@bids/UPDATE_USER_BIDS_LIST');

/**
 * Add bid.
 */
export const AddBid = createAction<Bid>('@bids/ADD_BID');

/**
 * Update bids loading state.
 */
export const UpdateIsLoadingBids = createAction<boolean>('@bids/UPDATE_IS_LOADING');

/**
 * Update bids error state.
 */
export const UpdateBidsError = createAction<boolean>('@bids/UPDATE_ERROR');

/**
 * Remove bid.
 */
export const RemoveBid = createAction<Bid['_key']>('@bids/REMOVE_BID');
