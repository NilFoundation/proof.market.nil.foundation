/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { call, put } from 'redux-saga/effects';
import type { StrictEffect } from 'redux-saga/effects';
import { SetIsOnline } from '@/redux';
import { clearAuthLocalStorageState } from '@/utils';
import { UpdateIsAuthorized } from '../actions';

/**
 * Removes current user if api call response returns 401 error.
 * Handles network error by dispatching SetIsOnline action.
 * Consider to wrap all significant api calls into this.
 *
 * @param fn Api call.
 * @param args - Api call arguments.
 * @returns Api call result or throws error.
 * @throws Api call error.
 * @yields
 * @example
 * ```ts
 * const result = yield call(ProtectedCall, callMethod, callArguments);
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function* ProtectedCall<T extends (...args: any[]) => any>(
    fn: T,
    ...args: Parameters<T>
): Generator<StrictEffect, unknown, unknown> {
    try {
        const result: unknown = yield call(fn, ...args);

        yield put(SetIsOnline(true));

        return result;
    } catch (e) {
        if (!e.response) {
            yield put(SetIsOnline(false));
        } else {
            yield put(SetIsOnline(true));
        }

        if (e.response?.status === 401) {
            yield put(UpdateIsAuthorized(false));
            clearAuthLocalStorageState();
        }

        throw e;
    }
}
