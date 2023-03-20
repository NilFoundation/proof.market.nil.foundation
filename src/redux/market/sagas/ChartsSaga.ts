/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { call, fork, put, takeLatest, select } from 'redux-saga/effects';
import type { SagaIterator } from '@redux-saga/core';
import { getAsks } from '@/api';
import { ProtectedCall } from '@/redux';
import type { Ask } from '@/models';
import { getRuntimeConfigOrThrow } from '@/utils';
import {
    UpdateSelectedCircuitKey,
    UpdateChartsData,
    UpdateIsErrorGettingChartsData,
    UpdateIsLoadingChartsData,
} from '../actions';
import { selectCurrentCircuitKey } from '../selectors';
import { RevalidateSaga } from '../../common';

const revalidateDataDelay = Number(getRuntimeConfigOrThrow().REVALIDATE_DATA_INTERVAL) || 3000;

/**
 * Charts saga.
 *
 * @yields
 */
export function* ChartsSaga(): SagaIterator<void> {
    yield takeLatest(UpdateSelectedCircuitKey, function* () {
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
    const currentStatementKey: string | undefined = yield select(selectCurrentCircuitKey);

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

        const completedAsks: Ask[] = yield call(ProtectedCall, getAsks, apiCallParameters);

        const currentKey = yield select(selectCurrentCircuitKey);

        // TODO - remove after RevalidateSaga refactor
        // At the moment that fixes updating redux with outtadet api call bug
        const shouldUpdateChartsData =
            completedAsks !== undefined && currentStatementKey === currentKey;
        if (shouldUpdateChartsData) {
            yield put(UpdateChartsData(completedAsks));
        }
    } catch (e) {
        yield put(UpdateIsErrorGettingChartsData(true));
    } finally {
        yield put(UpdateIsLoadingChartsData(false));
    }
}
