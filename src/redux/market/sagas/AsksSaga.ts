/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { call, fork, put, takeLatest, select, all } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import { getAsks } from 'src/api';
import { Ask } from 'src/models';
import { ProtectedCall } from 'src/redux';
import {
    UpdateSelectedCircuitId,
    UpdateAsksList,
    UpdateIsLoadingAsks,
    UpdateAsksError,
    UpdateUserAsksList,
} from '../actions';
import { selectCurrentCircuitId } from '../selectors';
import { RevalidateSaga } from '../../common';
import { selectUserName } from '../../login';

const revalidateAsksDelay = Number(process.env.REACT_APP_REVALIDATE_DATA_INTERVAL) || 3000;

/**
 * Asks main saga.
 *
 * @yields
 */
export function* AsksSaga(): SagaIterator<void> {
    yield takeLatest(UpdateSelectedCircuitId, function* () {
        yield put(UpdateAsksList([]));
        yield put(UpdateUserAsksList([]));
        yield fork(GetAsksSaga);
    });
    yield fork(RevalidateSaga, GetAsksSaga, revalidateAsksDelay);
}

/**
 * Get asks saga.
 *
 * @yields
 */
function* GetAsksSaga(): SagaIterator<void> {
    const circuitId: string | undefined = yield select(selectCurrentCircuitId);
    const user: string | undefined = yield select(selectUserName);

    if (circuitId === undefined || !user) {
        return;
    }

    try {
        yield put(UpdateAsksError(false));
        yield put(UpdateIsLoadingAsks(true));

        const [asks, userAsks]: Array<Ask[]> = yield all([
            call(ProtectedCall, getAsks, { statement_key: circuitId }, 200),
            call(ProtectedCall, getAsks, { statement_key: circuitId, sender: user }, 100000),
        ]);

        if (asks !== undefined) {
            yield put(UpdateAsksList(asks));
        }

        if (userAsks !== undefined) {
            yield put(UpdateUserAsksList(userAsks));
        }
    } catch (e) {
        yield put(UpdateAsksError(true));
    } finally {
        yield put(UpdateIsLoadingAsks(false));
    }
}
