/**
 * @file Reducer.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { createReducer } from '@reduxjs/toolkit';
import type { Proposal, Request } from '@/models';
import {
    UpdateUserProposalsList,
    UpdateUserRequestsList,
    RemoveUserProposal,
    RemoveUserRequest,
    AddUserRequest,
    UpdateGettingUserOrdersError,
    UpdateIsLoadingUserOrders,
} from '../actions';

/**
 * State.
 */
export type UserOrdersReducerState = {
    proposals: Proposal[];
    requests: Request[];
    isLoading: boolean;
    isError: boolean;
};

/**
 * Initial state.
 */
const initialState: UserOrdersReducerState = {
    proposals: [],
    requests: [],
    isLoading: false,
    isError: false,
};

/**
 * Reducer of user orders.
 */
export const UserOrdersReducer = createReducer(initialState, builder =>
    builder
        .addCase(UpdateUserProposalsList, (state, { payload }) => {
            state.proposals = payload;
        })
        .addCase(UpdateUserRequestsList, (state, { payload }) => {
            state.requests = payload;
        })
        .addCase(UpdateGettingUserOrdersError, (state, { payload }) => {
            state.isError = payload;
        })
        .addCase(UpdateIsLoadingUserOrders, (state, { payload }) => {
            state.isLoading = payload;
        })
        .addCase(AddUserRequest, (state, { payload }) => {
            state.requests.push(payload);
        })
        .addCase(RemoveUserProposal, (state, { payload }) => ({
            ...state,
            proposals: state.proposals.filter(x => x._key !== payload),
        }))
        .addCase(RemoveUserRequest, (state, { payload }) => ({
            ...state,
            requests: state.requests.filter(x => x._key !== payload),
        })),
);
