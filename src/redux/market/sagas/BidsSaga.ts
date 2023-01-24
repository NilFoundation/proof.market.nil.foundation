/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import { getBids } from 'src/api';
import { Bid } from 'src/models';
import { ProtectedCall } from 'src/redux';
import {
    UpdateSelectedCircuitId,
    UpdateBidsList,
    UpdateIsLoadingBids,
    UpdateBidsError,
    UpdateUserBidsList,
} from '../actions';
import { selectCurrentCircuitId } from '../selectors';
import { RevalidateSaga } from '../../common';
import { selectUserName } from '../../login';

const revalidateBidsDelay = Number(process.env.REACT_APP_REVALIDATE_DATA_INTERVAL) || 3000;

/**
 * Bids main saga.
 *
 * @yields
 */
export function* BidsSaga(): SagaIterator<void> {
    yield takeLatest(UpdateSelectedCircuitId, function* () {
        yield put(UpdateBidsList([]));
        yield put(UpdateUserBidsList([]));
        yield fork(GetBidsSaga);
    });
    yield fork(RevalidateSaga, GetBidsSaga, revalidateBidsDelay);
}

/**
 * Get bids saga.
 *
 * @yields
 */
function* GetBidsSaga(): SagaIterator<void> {
    const circuitId: string | undefined = yield select(selectCurrentCircuitId);
    const user: string | undefined = yield select(selectUserName);

    if (circuitId === undefined || !user) {
        return;
    }

    try {
        yield put(UpdateBidsError(false));
        yield put(UpdateIsLoadingBids(true));

        const [bids, userBids]: Array<Bid[]> = yield all([
            call(ProtectedCall, getBids, { statement_key: circuitId }, 200),
            call(ProtectedCall, getBids, { statement_key: circuitId, sender: user }, 100000),
        ]);

        if (bids !== undefined) {
            yield put(UpdateBidsList(bids));
        }

        if (userBids !== undefined) {
            yield put(UpdateUserBidsList(userBids));
        }
    } catch (e) {
        yield put(UpdateBidsError(true));
    } finally {
        yield put(UpdateIsLoadingBids(false));
    }
}
