/**
 * @file Redux action creators.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { createAction } from '@reduxjs/toolkit';
import type { Proposal, Request } from '@/models';

/**
 * Update user proposals list.
 */
export const UpdateUserProposalsList = createAction<Proposal[]>(
    '@userOrders/UPDATE_USER_PROPOSALS',
);

/**
 * Update user requests list.
 */
export const UpdateUserRequestsList = createAction<Request[]>('@userOrders/UPDATE_USER_REQUESTS');

/**
 * Update loading state.
 */
export const UpdateIsLoadingUserOrders = createAction<boolean>('@userOrders/UPDATE_IS_LOADING');

/**
 * Update error state.
 */
export const UpdateGettingUserOrdersError = createAction<boolean>('@userOrders/UPDATE_IS_ERROR');

/**
 * Remove user proposal.
 */
export const RemoveUserProposal = createAction<Proposal['_key']>('@userOrders/REMOVE_PROPOSAL');

/**
 * Remove user request.
 */
export const RemoveUserRequest = createAction<Request['_key']>('@userOrders/REMOVE_REQUEST');

/**
 * Add user request.
 */
export const AddUserRequest = createAction<Request>('@userOrders/ADD_REQUEST');
