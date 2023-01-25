/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { notificationActions, Variant } from '@nilfoundation/react-components';
import { SagaIterator } from '@redux-saga/core';
import { delay, put, takeLatest } from 'redux-saga/effects';
import { SetPageIsVisible, StartDataRevalidation, StopDataRevalidation } from '../actions';

const stopApiCallsAfterUserLeavesPageTimeout = 25000;

let dataRevalidationIsStopped = false;

/**
 * User main saga.
 *
 * @yields
 */
export function* DataRevalidationSaga(): SagaIterator<void> {
    yield takeLatest(SetPageIsVisible, HandlePageVisibilityChange);
}

/**
 * Handle user leaves/returns to the page.
 *
 * @param {ReturnType<typeof SetPageIsVisible>} action Action return type.
 * @yields
 */
function* HandlePageVisibilityChange({
    payload: isUserOnThePage,
}: ReturnType<typeof SetPageIsVisible>): SagaIterator<void> {
    if (isUserOnThePage) {
        if (!dataRevalidationIsStopped) {
            return;
        }

        dataRevalidationIsStopped = false;

        yield put(StartDataRevalidation());

        notificationActions?.create({
            title: 'Network warning',
            message: 'Please wait before data updates',
            variant: Variant.warning,
        });

        return;
    }

    yield delay(stopApiCallsAfterUserLeavesPageTimeout);
    yield put(StopDataRevalidation());
    dataRevalidationIsStopped = true;
}
