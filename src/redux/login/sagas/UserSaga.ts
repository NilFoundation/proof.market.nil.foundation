/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { SagaIterator } from '@redux-saga/core';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getUserBalance } from '@/api';
import type { UserBalance } from '@/models';
import { getRuntimeConfigOrThrow } from '@/utils';
import { AuthType } from '@/enums';
import {
    UpdateGoogleUserInfo,
    UpdateUserBalance,
    UpdateUserBalanceIsLoading,
    UpdateUserBalanceIsLoadingError,
    UpdateUserName,
} from '../actions';
import { ProtectedCall } from './ProtectedCall';
import { AddUserBid, RemoveUserAsk, RemoveUserBid } from '../../market';
import { selectAuthType, selectGoogleUserInfo, selectUserName } from '../selectors';

/**
 * User main saga.
 *
 * @yields
 */
export function* UserSaga(): SagaIterator<void> {
    yield takeLatest(
        [UpdateUserName, AddUserBid, RemoveUserAsk, RemoveUserBid, UpdateGoogleUserInfo],
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
    const googleUserInfo: ReturnType<typeof selectGoogleUserInfo> = yield select(
        selectGoogleUserInfo,
    );
    const authType = yield select(selectAuthType);
    const isReadonly = user === getRuntimeConfigOrThrow().READONLY_USER;

    if (isReadonly || !user) {
        return;
    }

    try {
        yield put(UpdateUserBalanceIsLoading(true));
        yield put(UpdateUserBalanceIsLoadingError(false));

        const userId = authType === AuthType.credentials ? user : googleUserInfo?.id;

        const balance: UserBalance | undefined = yield call(ProtectedCall, getUserBalance, userId);
        yield put(UpdateUserBalance(balance));
    } catch {
        yield put(UpdateUserBalanceIsLoadingError(true));
    } finally {
        yield put(UpdateUserBalanceIsLoading(false));
    }
}
