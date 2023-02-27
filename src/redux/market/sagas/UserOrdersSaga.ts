/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { call, fork, put, takeLatest, select, all } from 'redux-saga/effects';
import type { SagaIterator } from '@redux-saga/core';
import type { GetOrdersParameters } from 'src/api';
import { getBids, getAsks } from 'src/api';
import { ProtectedCall, selectUserName } from 'src/redux/login';
import { getRuntimeConfigOrThrow } from 'src/utils';
import {
    UpdateSelectedCircuitKey,
    UpdateUserAsksList,
    UpdateUserBidsList,
    UpdateGettingUserOrdersError,
    UpdateIsLoadingUserOrders,
} from '../actions';
import { selectCurrentCircuitKey } from '../selectors';
import { RevalidateSaga } from '../../common';

const revalidateAsksDelay = Number(getRuntimeConfigOrThrow().REVALIDATE_DATA_INTERVAL) || 3000;

/**
 * User orders saga.
 *
 * @yields
 */
export function* UserOrdersSaga(): SagaIterator<void> {
    yield takeLatest(UpdateSelectedCircuitKey, function* () {
        yield put(UpdateUserAsksList([]));
        yield put(UpdateUserBidsList([]));
        yield fork(GetUserOrdersSaga);
    });
    yield fork(RevalidateSaga, GetUserOrdersSaga, revalidateAsksDelay);
}

/**
 * Get user orders saga.
 *
 * @yields
 */
function* GetUserOrdersSaga(): SagaIterator<void> {
    const selectedStatementKey: string | undefined = yield select(selectCurrentCircuitKey);
    const currentUser = yield select(selectUserName);

    if (selectedStatementKey === undefined || !currentUser) {
        return;
    }

    const apiCallOptions: GetOrdersParameters = {
        statement_key: selectedStatementKey,
        sender: currentUser,
    };

    try {
        yield put(UpdateGettingUserOrdersError(false));
        yield put(UpdateIsLoadingUserOrders(true));

        const [userAsks, userBids] = yield all([
            call(ProtectedCall, getAsks, apiCallOptions),
            call(ProtectedCall, getBids, apiCallOptions),
        ]);

        if (userAsks !== undefined) {
            yield put(UpdateUserAsksList(userAsks));
        }

        if (userBids !== undefined) {
            yield put(UpdateUserBidsList(userAsks));
        }
    } catch (e) {
        yield put(UpdateGettingUserOrdersError(true));
    } finally {
        yield put(UpdateIsLoadingUserOrders(false));
    }
}
