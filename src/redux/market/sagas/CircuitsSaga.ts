/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';
import type { SagaIterator } from '@redux-saga/core';
import { getCircuits, getCircuitsInfo, getCircuitsStats } from '@/api';
import type { Circuit, CircuitInfo, CircuitStats } from '@/models';
import { getRuntimeConfigOrThrow } from '@/utils';
import { RouterParam } from '@/enums';
import {
    UpdateCircuitsError,
    UpdateCircuitsInfoList,
    UpdateCircuitsList,
    UpdateCircuitsStats,
    UpdateIsLoadingCircuits,
    UpdateIsLoadingCircuitsInfo,
    UpdateIsLoadingCircuitsStats,
    UpdateSelectedCircuitKey,
} from '../actions';
import { ProtectedCall, UpdateUserName } from '../../login';
import { selectCurrentCircuitKey } from '../selectors';
import { RevalidateSaga, createUrlParamSelector } from '../../common';

const revalidateCircuitsInfoInterval =
    Number(getRuntimeConfigOrThrow().REVALIDATE_DATA_INTERVAL) || 3000;

/**
 * Circuits main saga.
 *
 * @yields
 */
export function* CircuitsSaga(): SagaIterator<void> {
    yield takeLatest(UpdateUserName, GetCircuitsSaga);
    yield takeLatest(UpdateCircuitsList, SelectCircuitSaga);
    yield fork(RevalidateSaga, GetCircuitsAdditionalData, revalidateCircuitsInfoInterval);
}

/**
 * Get circuits saga.
 *
 * @param {ReturnType<typeof UpdateUserName>} action Action return type.
 * @yields
 */
function* GetCircuitsSaga({
    payload: user,
}: ReturnType<typeof UpdateUserName>): SagaIterator<void> {
    if (!user) {
        return;
    }

    try {
        yield put(UpdateIsLoadingCircuits(true));
        yield put(UpdateCircuitsError(false));

        const circuitsList: Circuit[] = yield call(ProtectedCall, getCircuits);

        if (circuitsList !== undefined) {
            yield put(UpdateCircuitsList(circuitsList));
        }
    } catch {
        yield put(UpdateCircuitsError(true));
    } finally {
        yield put(UpdateIsLoadingCircuits(false));
    }
}

/**
 * Selects first circuit in list after circuits list update (if none is selected).
 *
 * @param {ReturnType<typeof UpdateCircuitsList>} action - Action.
 * @yields
 */
function* SelectCircuitSaga({
    payload: circuitsList,
}: ReturnType<typeof UpdateCircuitsList>): SagaIterator<void> {
    const currentCircuitKey = yield select(selectCurrentCircuitKey);
    const urlParamStatementName: string = yield select(
        createUrlParamSelector(RouterParam.statementName),
    );

    if (currentCircuitKey) {
        return;
    }

    if (!circuitsList.length) {
        return;
    }

    const circuitWithNameFromUrl = circuitsList.find(x => x.name === urlParamStatementName);
    const shouldSelectFromUrl = !!circuitWithNameFromUrl;
    const keyToSelect = shouldSelectFromUrl ? circuitWithNameFromUrl._key : circuitsList[0]._key;

    yield put(UpdateSelectedCircuitKey(keyToSelect));
}

/**
 * Revalidate circuits info.
 *
 * @yields
 */
function* GetCircuitsInfoSaga() {
    try {
        yield put(UpdateIsLoadingCircuitsInfo(true));
        const circutsInfo: CircuitInfo[] = yield call(ProtectedCall, getCircuitsInfo);
        yield put(UpdateCircuitsInfoList(circutsInfo));
    } catch {
        // Do nothing
    } finally {
        yield put(UpdateIsLoadingCircuitsInfo(false));
    }
}

/**
 * Revalidate circuits stats.
 *
 * @yields
 */
function* GetCircuitsStatsSaga() {
    try {
        yield put(UpdateIsLoadingCircuitsStats(true));
        const circutsStats: CircuitStats[] = yield call(ProtectedCall, getCircuitsStats);
        yield put(UpdateCircuitsStats(circutsStats));
    } catch {
        // Do nothing
    } finally {
        yield put(UpdateIsLoadingCircuitsStats(false));
    }
}

/**
 * Revalidate circuit additional data (info and statistics).
 *
 * @yields
 */
function* GetCircuitsAdditionalData() {
    yield all([fork(GetCircuitsInfoSaga), fork(GetCircuitsStatsSaga)]);
}
