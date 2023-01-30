/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { notificationActions, Variant } from '@nilfoundation/react-components';
import { SagaIterator } from '@redux-saga/core';
import { takeLatest } from 'redux-saga/effects';
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

        offlineNotificationId = notificationActions?.create({
            title: 'Network error',
            message:
                'Something is temporarily wrong with your network connection. Trying to reconnect.',
            variant: Variant.danger,
        });

        return;
    }

    offlineNotificationId && notificationActions?.remove(offlineNotificationId);
    offlineNotificationId = undefined;
}
