/**
 * @file Root saga.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { all, fork } from 'redux-saga/effects';
import type { AllEffect, ForkEffect } from 'redux-saga/effects';
import { CircuitsSaga, OrderBookSaga, ChartsSaga, UserOrdersSaga } from './market';
import { AuthSaga, UserSaga } from './login';
import { ProofSaga } from './portfolio';
import { DataRevalidationSaga, HadnleNetworkStateSaga } from './common';

/**
 * RootSaga.
 *
 * @yields
 */
export default function* RootSaga(): Iterator<AllEffect<ForkEffect>> {
    yield all([
        fork(AuthSaga),
        fork(UserSaga),
        fork(CircuitsSaga),
        fork(ChartsSaga),
        fork(UserOrdersSaga),
        fork(OrderBookSaga),
        fork(ProofSaga),
        fork(DataRevalidationSaga),
        fork(HadnleNetworkStateSaga),
    ]);
}
