/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { call, fork, put, takeLatest, select, all } from 'redux-saga/effects';
import type { SagaIterator } from '@redux-saga/core';
import { getRequests, getProposals } from '@/api';
import { ProtectedCall, selectUserName } from '@/redux/login';
import { getRuntimeConfigOrThrow } from '@/utils';
import type { TradeOrder } from '@/models';
import {
    UpdateSelectedStatementKey,
    UpdateUserProposalsList,
    UpdateUserRequestsList,
    UpdateGettingUserOrdersError,
    UpdateIsLoadingUserOrders,
} from '../actions';
import { selectCurrentStatementKey } from '../selectors';
import { RevalidateSaga } from '../../common';

const revalidateProposalsDelay = Number(getRuntimeConfigOrThrow().REVALIDATE_DATA_INTERVAL) || 3000;

/**
 * User orders saga.
 *
 * @yields
 */
export function* UserOrdersSaga(): SagaIterator<void> {
    yield takeLatest(UpdateSelectedStatementKey, function* () {
        yield put(UpdateUserProposalsList([]));
        yield put(UpdateUserRequestsList([]));
        yield fork(GetUserOrdersSaga);
    });
    yield fork(RevalidateSaga, GetUserOrdersSaga, revalidateProposalsDelay);
}

/**
 * Get user orders saga.
 *
 * @yields
 */
function* GetUserOrdersSaga(): SagaIterator<void> {
    const selectedStatementKey: string | undefined = yield select(selectCurrentStatementKey);
    const currentUser = yield select(selectUserName);

    if (selectedStatementKey === undefined || !currentUser) {
        return;
    }

    const apiCallOptions: Partial<TradeOrder> = {
        statement_key: selectedStatementKey,
        sender: currentUser,
    };

    try {
        yield put(UpdateGettingUserOrdersError(false));
        yield put(UpdateIsLoadingUserOrders(true));

        const [userProposals, userRequests] = yield all([
            call(ProtectedCall, getProposals, apiCallOptions),
            call(ProtectedCall, getRequests, apiCallOptions),
        ]);

        if (userProposals !== undefined) {
            yield put(UpdateUserProposalsList(userProposals));
        }

        if (userRequests !== undefined) {
            yield put(UpdateUserRequestsList(userProposals));
        }
    } catch (e) {
        yield put(UpdateGettingUserOrdersError(true));
    } finally {
        yield put(UpdateIsLoadingUserOrders(false));
    }
}
