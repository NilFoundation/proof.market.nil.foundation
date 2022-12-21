/**
 * @file Root saga.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { all, AllEffect, fork, ForkEffect } from 'redux-saga/effects';
import { CircuitsSaga, AsksSaga, BidsSaga } from './market';
import { AuthSaga } from './login';
import { ProofSaga } from './portfolio';

/**
 * RootSaga.
 *
 * @yields
 */
export default function* RootSaga(): Iterator<AllEffect<ForkEffect>> {
    yield all([
        fork(AuthSaga),
        fork(CircuitsSaga),
        fork(AsksSaga),
        fork(BidsSaga),
        fork(ProofSaga),
    ]);
}