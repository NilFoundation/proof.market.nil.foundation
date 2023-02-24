/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { call, put, select } from 'redux-saga/effects';
import type { SagaIterator } from '@redux-saga/core';
import { getProofProducerInfo } from 'src/api';
import type { RootStateType } from 'src/redux/RootStateType';
import { createUrlParamSelector } from 'src/redux/common';
import { RouterParam } from 'src/enums';
import { ProtectedCall, selectUserName } from '../../login';
import {
    UpdateIsErrorPortfolioProposalsInfo,
    UpdateIsLoadingPortfolioProposalsInfo,
    UpdateSelectedPortfolioProposalsInfoKey,
    UpdatePortfolioProposalsInfo,
} from '../actions';

/**
 * Get proof portfolio proposals info saga.
 *
 * @yields
 */
export function* PortfolioProposalsInfoSaga(): SagaIterator<void> {
    const user: ReturnType<typeof selectUserName> = yield select(selectUserName);

    if (!user) {
        return;
    }

    try {
        yield put(UpdateIsErrorPortfolioProposalsInfo(false));
        yield put(UpdateIsLoadingPortfolioProposalsInfo(true));

        const proofProducerInfo = yield call(ProtectedCall, getProofProducerInfo);

        if (proofProducerInfo !== undefined) {
            yield put(UpdatePortfolioProposalsInfo(proofProducerInfo));
        }
    } catch (e) {
        yield put(UpdateIsErrorPortfolioProposalsInfo(true));
    } finally {
        yield put(UpdateIsLoadingPortfolioProposalsInfo(false));
    }
}

/**
 * Selects portfolio proposals info.
 *
 * @param {ReturnType<typeof UpdatePortfolioProposalsInfo>} action - Action.
 * @yields
 */
export function* SelectPortfolioProposalsInfoSaga({
    payload: proofProducerInfo,
}: ReturnType<typeof UpdatePortfolioProposalsInfo>): SagaIterator<void> {
    const currentSelectedProofProducerInfoKey = yield select(
        (s: RootStateType) => s.portfolioProposalsInfo.selectedKey,
    );

    if (currentSelectedProofProducerInfoKey !== undefined) {
        return;
    }

    if (!proofProducerInfo.length) {
        return;
    }

    const urlParamKey: string = yield select(
        createUrlParamSelector(RouterParam.portfolioProposalsInfoStatementName),
    );

    const shouldSelectFromUrl = proofProducerInfo.some(x => x._key === urlParamKey);
    const keyToSelect = shouldSelectFromUrl ? urlParamKey : proofProducerInfo[0]._key;

    yield put(UpdateSelectedPortfolioProposalsInfoKey(keyToSelect));
}
