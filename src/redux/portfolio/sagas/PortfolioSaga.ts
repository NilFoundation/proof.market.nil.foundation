/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { all, fork, takeLatest } from 'redux-saga/effects';
import type { SagaIterator } from '@redux-saga/core';
import {
    UpdatePortfolioRequestsInfo,
    UpdateProofList,
    UpdatePortfolioProposalsInfo,
    UpdateUserStatementsInfo,
} from '../actions';
import { UpdateUserName } from '../../login';
import { GetProofSaga, SelectProofSaga } from './ProofSaga';
import { SelectUserStatementSaga, UserStatementsInfoSaga } from './UserStatementsInfoSaga';
import {
    PortfolioProposalsInfoSaga,
    SelectPortfolioProposalsInfoSaga,
} from './PortfolioProposalsInfoSaga';
import {
    PortfolioRequestsInfoSaga,
    SelectPortfolioRequestsInfoSaga,
} from './PortfolioRequestsInfoSaga';

/**
 * Portfolio main saga.
 *
 * @yields
 */
export function* PortfolioSaga(): SagaIterator<void> {
    yield all([
        takeLatest(UpdateUserName, function* () {
            yield fork(GetProofSaga);
            yield fork(UserStatementsInfoSaga);
            yield fork(PortfolioProposalsInfoSaga);
            yield fork(PortfolioRequestsInfoSaga);
        }),
        takeLatest(UpdateProofList, SelectProofSaga),
        takeLatest(UpdateUserStatementsInfo, SelectUserStatementSaga),
        takeLatest(UpdatePortfolioProposalsInfo, SelectPortfolioProposalsInfoSaga),
        takeLatest(UpdatePortfolioRequestsInfo, SelectPortfolioRequestsInfoSaga),
    ]);
}
