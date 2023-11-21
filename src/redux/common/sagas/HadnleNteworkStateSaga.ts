/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { takeLatest } from 'redux-saga/effects';
import type { SagaIterator } from '@redux-saga/core';
import { NOTIFICATION_KIND } from '@nilfoundation/ui-kit';
import { notificationActions } from '@/features/notifications';
import { SetIsOnline } from '../actions';

let offlineNotificationId: string | undefined = undefined;

/**
 * Handle offline client state saga.
 *
 * @yields
 */
export function* HadnleNetworkStateSaga(): SagaIterator<void> {
  yield takeLatest(SetIsOnline, HandleOnlineStatusChange);
}

/**
 * Handle changing of client online status.
 *
 * @param {ReturnType<typeof SetIsOnline>} action Action return type.
 */
function* HandleOnlineStatusChange({
  payload: isOnline,
}: ReturnType<typeof SetIsOnline>): SagaIterator<void> {
  if (!isOnline) {
    if (offlineNotificationId !== undefined) {
      return;
    }

    offlineNotificationId = notificationActions.create({
      message:
        'Something is temporarily wrong with receiving data. You could wait for a reconnect or try to reload the page.',
      kind: NOTIFICATION_KIND.negative,
    });

    return;
  }

  offlineNotificationId && notificationActions?.remove(offlineNotificationId);
  offlineNotificationId = undefined;
}
