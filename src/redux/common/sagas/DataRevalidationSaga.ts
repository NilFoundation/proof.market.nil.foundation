/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { delay, put, takeLatest } from 'redux-saga/effects';
import type { SagaIterator } from '@redux-saga/core';
import { NOTIFICATION_KIND } from '@nilfoundation/ui-kit';
import { notificationActions } from '@/features/notifications';
import { SetPageIsVisible, StartDataRevalidation, StopDataRevalidation } from '../actions';

const stopApiCallsAfterUserLeavesPageTimeout = 25000;

let dataRevalidationIsStopped = false;

/**
 * Page visibility saga.
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

    notificationActions.create({
      message: 'Connection restored. Please, wait before data updates',
      kind: NOTIFICATION_KIND.warning,
    });

    return;
  }

  yield delay(stopApiCallsAfterUserLeavesPageTimeout);
  yield put(StopDataRevalidation());
  dataRevalidationIsStopped = true;
}
