/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { call, fork, put, takeLatest, select } from 'redux-saga/effects';
import type { SagaIterator } from '@redux-saga/core';
import { getProposals } from '@/api';
import { ProtectedCall } from '@/redux';
import type { Proposal } from '@/models';
import { getRuntimeConfigOrThrow } from '@/utils';
import {
    UpdateSelectedStatementKey,
    UpdateChartsData,
    UpdateIsErrorGettingChartsData,
    UpdateIsLoadingChartsData,
} from '../actions';
import { selectCurrentStatementKey } from '../selectors';
import { RevalidateSaga } from '../../common';

const revalidateDataDelay = Number(getRuntimeConfigOrThrow().REVALIDATE_DATA_INTERVAL) || 3000;

/**
 * Charts saga.
 *
 * @yields
 */
export function* ChartsSaga(): SagaIterator<void> {
    yield takeLatest(UpdateSelectedStatementKey, function* () {
        yield put(UpdateChartsData([]));
        yield fork(GetChartsDataSaga);
    });
    yield fork(RevalidateSaga, GetChartsDataSaga, revalidateDataDelay);
}

/**
 * Get charts data saga.
 *
 * @yields
 */
function* GetChartsDataSaga(): SagaIterator<void> {
    const currentStatementKey: string | undefined = yield select(selectCurrentStatementKey);

    if (currentStatementKey === undefined) {
        return;
    }

    const apiCallParameters = {
        statement_key: currentStatementKey,
        status: 'completed',
    };

    try {
        yield put(UpdateIsErrorGettingChartsData(false));
        yield put(UpdateIsLoadingChartsData(true));

        const completedProposals: Proposal[] = yield call(
            ProtectedCall,
            getProposals,
            apiCallParameters,
        );

        const currentKey = yield select(selectCurrentStatementKey);

        // TODO - remove after RevalidateSaga refactor
        // At the moment that fixes updating redux with outtadet api call bug
        const shouldUpdateChartsData =
            completedProposals !== undefined && currentStatementKey === currentKey;
        if (shouldUpdateChartsData) {
            yield put(UpdateChartsData(completedProposals));
        }
    } catch (e) {
        yield put(UpdateIsErrorGettingChartsData(true));
    } finally {
        yield put(UpdateIsLoadingChartsData(false));
    }
}
