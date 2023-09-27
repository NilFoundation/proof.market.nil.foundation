/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { delay, call, take, fork, cancel } from 'redux-saga/effects';
import type { SagaIterator } from 'redux-saga';
import { UpdateUserName } from '../../login';
import { StartDataRevalidation, StopDataRevalidation } from '../actions';

/**
 * Helps to revalidate data on interval. Revalidation starts when auth completes.
 * Stops data revalidation when user logs out or leaves the page.
 *
 * @param fnToRevalidate - Function to revalidate data. Can be Generator or common function.
 * @param revalidateInterval - Interval between calling fn.
 * @param args - Any arguments to pass into fn.
 * @returns Revalidation saga.
 * @yields
 */
export function* RevalidateSaga<T extends (...args: unknown[]) => unknown>(
  fnToRevalidate: T,
  revalidateInterval: number,
  ...args: Parameters<T>
): SagaIterator {
  while (true) {
    const { payload, type } = yield take([UpdateUserName, StartDataRevalidation]);

    if (type === StartDataRevalidation.type || payload) {
      yield call(Revalidate, fnToRevalidate, revalidateInterval, ...args);
    }
  }
}

function* Revalidate<T extends (...args: unknown[]) => unknown>(
  fnToRevalidate: T,
  revalidateInterval: number,
  ...args: Parameters<T>
): SagaIterator {
  const task = yield fork(function* () {
    while (true) {
      yield call(fnToRevalidate, ...args);
      yield delay(revalidateInterval);
    }
  });

  const { payload, type } = yield take([UpdateUserName, StopDataRevalidation]);

  if (type === StopDataRevalidation.type || !payload) {
    yield cancel(task);
  }
}
