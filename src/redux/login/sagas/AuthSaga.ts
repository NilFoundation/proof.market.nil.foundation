/**
 * @file Redux saga.
 * @todo Add token renewal after implementing on backend.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { fork, put } from 'redux-saga/effects';
import type { SagaIterator } from '@redux-saga/core';
import { getItemFromLocalStorage } from '@/packages/LocalStorage';
import { getUserFromJwt } from '@/utils';
import { UpdateIsAuthorized, UpdateUserName } from '../actions';

/**
 * Auth main saga.
 *
 * @yields
 */
export function* AuthSaga(): SagaIterator<void> {
  yield fork(TryGetUserFromLocalStorageTokenSaga);
  //yield takeLatest(SetJwtRevalidateTimeout, RenewJwtSaga);
}

/**
 * Tries to get user from localStorage token.
 *
 * @yields
 */
function* TryGetUserFromLocalStorageTokenSaga(): SagaIterator<void> {
  const token = getItemFromLocalStorage<string>('userToken');

  if (!token) {
    return;
  }

  const user = getUserFromJwt(token);

  if (user) {
    yield put(UpdateUserName(user));
    yield put(UpdateIsAuthorized(true));

    //const timeout = calculateRenewJwtTimeGap(token);
    //yield put(SetJwtRevalidateTimeout(timeout));
  }
}

// /**
//  * Renews jwt token to prevent auto-logout from dbms instance.
//  *
//  * @param {ReturnType<typeof SetJwtRevalidateTimeout>} params .
//  * @yields
//  */
// function* RenewJwtSaga({
//     payload: timeout,
// }: ReturnType<typeof SetJwtRevalidateTimeout>): SagaIterator<void> {
//     const task = yield fork(processRenewJwt, timeout);

//     while (true) {
//         const { payload: user } = yield take(UpdateUserName);
//         if (!user) {
//             yield cancel(task);
//         }
//     }
// }

// /**
//  * Renew jwt process.
//  *
//  * @param timeout Revalidation timeout.
//  * @yields
//  */
// function* processRenewJwt(timeout: number): SagaIterator<void> {
//     yield delay(timeout);

//     try {
//         const currentUser = yield select(selectUserName);

//         const result: Awaited<ReturnType<typeof renewJwt>> = yield call(renewJwt, currentUser);
//         const { jwt } = result;

//         if (!jwt) {
//             return;
//         }

//         const user = getUserFromJwt(jwt);
//         const timeout = calculateRenewJwtTimeGap(jwt);

//         if (user === currentUser) {
//             setItemIntoLocalStorage('userToken', jwt);

//             yield put(SetJwtRevalidateTimeout(timeout));
//         }
//     } catch (e) {
//         // Do nothing
//     }
// }
