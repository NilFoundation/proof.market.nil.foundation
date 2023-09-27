/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { call, put, takeLatest, fork } from 'redux-saga/effects';
import type { SagaIterator } from '@redux-saga/core';
import { getLastProofProducerData } from '@/api';
import type { LastProofProducer } from '@/models';
import { getRuntimeConfigOrThrow } from '@/utils';
import {
  UpdateLastProofProducer,
  UpdateIsLoadingLastProofProducer,
  UpdateIsErrorLastProofProducer,
} from '../actions';
import { ProtectedCall, UpdateUserName } from '../../login';
import { RevalidateSaga } from '../../common';

const revalidateDataInterval = Number(getRuntimeConfigOrThrow().REVALIDATE_DATA_INTERVAL) || 3000;

/**
 * Last proof producer saga.
 *
 * @yields
 */
export function* LastProofProducerSaga(): SagaIterator<void> {
  yield takeLatest(UpdateUserName, function* () {
    yield put(UpdateLastProofProducer(undefined));
    yield fork(GetLastProofProducerSaga);
  });
  yield fork(RevalidateSaga, GetLastProofProducerSaga, revalidateDataInterval);
}

/**
 * Get last proof producer data saga.
 *
 * @yields
 */
function* GetLastProofProducerSaga(): SagaIterator<void> {
  try {
    yield put(UpdateIsLoadingLastProofProducer(true));
    yield put(UpdateIsErrorLastProofProducer(false));

    const apiCallResult: Array<LastProofProducer> | undefined = yield call(
      ProtectedCall,
      getLastProofProducerData,
    );

    yield put(UpdateLastProofProducer(apiCallResult));
  } catch (e) {
    yield put(UpdateIsErrorLastProofProducer(true));
  } finally {
    yield put(UpdateIsLoadingLastProofProducer(false));
  }
}
