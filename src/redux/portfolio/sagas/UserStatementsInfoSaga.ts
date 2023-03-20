/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { call, put, select } from 'redux-saga/effects';
import type { SagaIterator } from '@redux-saga/core';
import { getUserStatementsInfo } from '@/api';
import { createUrlParamSelector } from '@/redux/common';
import { RouterParam } from '@/enums';
import {
    UpdateUserStatementsInfo,
    UpdateIsLoadingUserStatementsInfo,
    UpdateIsErrorUserStatementsInfo,
    UpdateSelectedUserStatementsInfoKey,
} from '../actions';
import { ProtectedCall, selectUserName } from '../../login';
import type { RootStateType } from '../../RootStateType';

/**
 * Get user statements info saga.
 *
 * @yields
 */
export function* UserStatementsInfoSaga(): SagaIterator<void> {
    const user: ReturnType<typeof selectUserName> = yield select(selectUserName);

    if (!user) {
        return;
    }

    try {
        yield put(UpdateIsErrorUserStatementsInfo(false));
        yield put(UpdateIsLoadingUserStatementsInfo(true));

        const statementsInfo = yield call(ProtectedCall, getUserStatementsInfo);

        if (statementsInfo !== undefined) {
            yield put(UpdateUserStatementsInfo(statementsInfo));
        }
    } catch (e) {
        yield put(UpdateIsErrorUserStatementsInfo(true));
    } finally {
        yield put(UpdateIsLoadingUserStatementsInfo(false));
    }
}

/**
 * Selects user statement info.
 *
 * @param {ReturnType<typeof UpdateUserStatementsInfo>} action - Action.
 * @yields
 */
export function* SelectUserStatementSaga({
    payload: statementInfo,
}: ReturnType<typeof UpdateUserStatementsInfo>): SagaIterator<void> {
    const currentSelectedStatementInfoKey = yield select(
        (s: RootStateType) => s.userStatementInfoState.selectedUserStatementInfoKey,
    );

    if (currentSelectedStatementInfoKey) {
        return;
    }

    if (!statementInfo.length) {
        return;
    }

    const urlParamKey: string = yield select(
        createUrlParamSelector(RouterParam.portfolioUserStatementsInfoName),
    );

    const shouldSelectFromUrl = statementInfo.some(x => x._key === urlParamKey);
    const keyToSelect = shouldSelectFromUrl ? urlParamKey : statementInfo[0]._key;

    yield put(UpdateSelectedUserStatementsInfoKey(keyToSelect));
}
