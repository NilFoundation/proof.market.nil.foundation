/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { call, cancel, delay, fork, put, select, take, takeLatest } from 'redux-saga/effects';
import type { SagaIterator } from '@redux-saga/core';
import { renewJwt } from '@/api';
import { getItemFromLocalStorage, setItemIntoLocalStorage } from '@/packages/LocalStorage';
import { calculateRenewJwtTimeGap, getUserFromJwt } from '@/utils';
import { SetJwtRevalidateTimeout, UpdateUserName } from '../actions';
import { selectUserName } from '../selectors';

/**
 * Auth main saga.
 *
 * @yields
 */
export function* AuthSaga(): SagaIterator<void> {
    yield fork(TryGetUserFromLocalStorageTokenSaga);
    yield takeLatest(SetJwtRevalidateTimeout, RenewJwtSaga);
}

/**
 * Tries to get user from localStorage token.
 *
 * @yields
 */
function* TryGetUserFromLocalStorageTokenSaga(): SagaIterator<void> {
    const jwt = getItemFromLocalStorage<string>('jwt');

    if (!jwt) {
        return;
    }

    const user = getUserFromJwt(jwt);

    if (user) {
        yield put(UpdateUserName(user));

        const timeout = calculateRenewJwtTimeGap(jwt);
        yield put(SetJwtRevalidateTimeout(timeout));
    }
}

/**
 * Renews jwt token to prevent auto-logout from dbms instance.
 *
 * @param {ReturnType<typeof SetJwtRevalidateTimeout>} params .
 * @yields
 */
function* RenewJwtSaga({
    payload: timeout,
}: ReturnType<typeof SetJwtRevalidateTimeout>): SagaIterator<void> {
    const task = yield fork(processRenewJwt, timeout);

    while (true) {
        const { payload: user } = yield take(UpdateUserName);
        if (!user) {
            yield cancel(task);
        }
    }
}

/**
 * Renew jwt process.
 *
 * @param timeout Revalidation timeout.
 * @yields
 */
function* processRenewJwt(timeout: number): SagaIterator<void> {
    yield delay(timeout);

    try {
        const currentUser = yield select(selectUserName);

        const result: Awaited<ReturnType<typeof renewJwt>> = yield call(renewJwt, currentUser);
        const { jwt } = result;

        if (!jwt) {
            return;
        }

        const user = getUserFromJwt(jwt);
        const timeout = calculateRenewJwtTimeGap(jwt);

        if (user === currentUser) {
            setItemIntoLocalStorage('jwt', jwt);

            yield put(SetJwtRevalidateTimeout(timeout));
        }
    } catch (e) {
        // Do nothing
    }
}
