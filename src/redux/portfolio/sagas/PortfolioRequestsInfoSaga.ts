/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { call, put, select } from 'redux-saga/effects';
import type { SagaIterator } from '@redux-saga/core';
import { getPortfolioRequestsInfo } from 'src/api';
import type { RootStateType } from 'src/redux/RootStateType';
import { createUrlParamSelector } from 'src/redux/common';
import { RouterParam } from 'src/enums';
import { ProtectedCall, selectUserName } from '../../login';
import {
    UpdateIsErrorPortfolioRequestsInfo,
    UpdateIsLoadingPortfolioRequestsInfo,
    UpdateSelectedPortfolioRequestsInfoKey,
    UpdatePortfolioRequestsInfo,
} from '../actions';

/**
 * Get portfolio requests info saga.
 *
 * @yields
 */
export function* PortfolioRequestsInfoSaga(): SagaIterator<void> {
    const user: ReturnType<typeof selectUserName> = yield select(selectUserName);

    if (!user) {
        return;
    }

    try {
        yield put(UpdateIsErrorPortfolioRequestsInfo(false));
        yield put(UpdateIsLoadingPortfolioRequestsInfo(true));

        const requestsInfo = yield call(ProtectedCall, getPortfolioRequestsInfo);

        if (requestsInfo !== undefined) {
            yield put(UpdatePortfolioRequestsInfo(requestsInfo));
        }
    } catch (e) {
        yield put(UpdateIsErrorPortfolioRequestsInfo(true));
    } finally {
        yield put(UpdateIsLoadingPortfolioRequestsInfo(false));
    }
}

/**
 * Selects portfolio requests info.
 *
 * @param {ReturnType<typeof UpdatePortfolioRequestsInfo>} action - Action.
 * @yields
 */
export function* SelectPortfolioRequestsInfoSaga({
    payload: portfolioRequestsInfo,
}: ReturnType<typeof UpdatePortfolioRequestsInfo>): SagaIterator<void> {
    const currentSelectedKey = yield select(
        (s: RootStateType) => s.portfolioRequestsInfo.selectedKey,
    );

    if (currentSelectedKey !== undefined) {
        return;
    }

    if (!portfolioRequestsInfo.length) {
        return;
    }

    const urlParamName: string = yield select(
        createUrlParamSelector(RouterParam.portfolioRequestsInfoStatementName),
    );

    const infoWithNameFromUrl = portfolioRequestsInfo.find(x => x.name === urlParamName);
    const shouldSelectFromUrl = !!infoWithNameFromUrl;
    const keyToSelect = shouldSelectFromUrl
        ? infoWithNameFromUrl._key
        : portfolioRequestsInfo[0]._key;

    yield put(UpdateSelectedPortfolioRequestsInfoKey(keyToSelect));
}
