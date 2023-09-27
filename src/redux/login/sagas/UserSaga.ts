/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { SagaIterator } from '@redux-saga/core';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getUserBalance } from '@/api';
import type { UserBalance } from '@/models';
import { getRuntimeConfigOrThrow } from '@/utils';
import {
  UpdateUserBalance,
  UpdateUserBalanceIsLoading,
  UpdateUserBalanceIsLoadingError,
  UpdateUserName,
} from '../actions';
import { ProtectedCall } from './ProtectedCall';
import { AddUserRequest, RemoveUserProposal, RemoveUserRequest } from '../../market';
import { selectUserName } from '../selectors';

/**
 * User main saga.
 *
 * @yields
 */
export function* UserSaga(): SagaIterator<void> {
  yield takeLatest(
    [UpdateUserName, AddUserRequest, RemoveUserProposal, RemoveUserRequest],
    GetUserBalance,
  );
}

/**
 * Gets user balance.
 *
 * @yields
 */
function* GetUserBalance(): SagaIterator<void> {
  const user = yield select(selectUserName);
  const isReadonly = user === getRuntimeConfigOrThrow().READONLY_USER;

  if (isReadonly || !user) {
    return;
  }

  try {
    yield put(UpdateUserBalanceIsLoading(true));
    yield put(UpdateUserBalanceIsLoadingError(false));

    const balance: UserBalance | undefined = yield call(ProtectedCall, getUserBalance, user);
    yield put(UpdateUserBalance(balance));
  } catch {
    yield put(UpdateUserBalanceIsLoadingError(true));
  } finally {
    yield put(UpdateUserBalanceIsLoading(false));
  }
}
