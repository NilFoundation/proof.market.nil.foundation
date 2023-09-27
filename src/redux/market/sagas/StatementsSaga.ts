/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';
import type { SagaIterator } from '@redux-saga/core';
import { getStatements, getStatementsInfo, getStatementsStats } from '@/api';
import type { Statement, StatementInfo, StatementStats } from '@/models';
import { getRuntimeConfigOrThrow } from '@/utils';
import { RouterParam } from '@/enums';
import {
  UpdateStatementsError,
  UpdateStatementsInfoList,
  UpdateStatementsList,
  UpdateStatementsStats,
  UpdateIsLoadingStatements,
  UpdateIsLoadingStatementsInfo,
  UpdateIsLoadingStatementsStats,
  UpdateSelectedStatementKey,
} from '../actions';
import { ProtectedCall, UpdateUserName } from '../../login';
import { selectCurrentStatementKey } from '../selectors';
import { RevalidateSaga, createUrlParamSelector } from '../../common';

const revalidateStatementsInfoInterval =
  Number(getRuntimeConfigOrThrow().REVALIDATE_DATA_INTERVAL) || 3000;

/**
 * Statements main saga.
 *
 * @yields
 */
export function* StatementsSaga(): SagaIterator<void> {
  yield takeLatest(UpdateUserName, GetStatementsSaga);
  yield takeLatest(UpdateStatementsList, SelectStatementSaga);
  yield fork(RevalidateSaga, GetStatementsAdditionalData, revalidateStatementsInfoInterval);
}

/**
 * Get statements saga.
 *
 * @param {ReturnType<typeof UpdateUserName>} action Action return type.
 * @yields
 */
function* GetStatementsSaga({
  payload: user,
}: ReturnType<typeof UpdateUserName>): SagaIterator<void> {
  if (!user) {
    return;
  }

  try {
    yield put(UpdateIsLoadingStatements(true));
    yield put(UpdateStatementsError(false));

    const statementsList: Statement[] = yield call(ProtectedCall, getStatements);

    if (statementsList !== undefined) {
      yield put(UpdateStatementsList(statementsList));
    }
  } catch {
    yield put(UpdateStatementsError(true));
  } finally {
    yield put(UpdateIsLoadingStatements(false));
  }
}

/**
 * Selects first statement in list after statements list update (if none is selected).
 *
 * @param {ReturnType<typeof UpdateStatementsList>} action - Action.
 * @yields
 */
function* SelectStatementSaga({
  payload: statementsList,
}: ReturnType<typeof UpdateStatementsList>): SagaIterator<void> {
  const currentStatementKey = yield select(selectCurrentStatementKey);
  const urlParamStatementName: string = yield select(
    createUrlParamSelector(RouterParam.statementName),
  );

  if (currentStatementKey) {
    return;
  }

  if (!statementsList.length) {
    return;
  }

  const statementWithNameFromUrl = statementsList.find(x => x.name === urlParamStatementName);
  const shouldSelectFromUrl = !!statementWithNameFromUrl;
  const keyToSelect = shouldSelectFromUrl ? statementWithNameFromUrl._key : statementsList[0]._key;

  yield put(UpdateSelectedStatementKey(keyToSelect));
}

/**
 * Revalidate statements info.
 *
 * @yields
 */
function* GetStatementsInfoSaga() {
  try {
    yield put(UpdateIsLoadingStatementsInfo(true));
    const statementsInfo: StatementInfo[] = yield call(ProtectedCall, getStatementsInfo);
    yield put(UpdateStatementsInfoList(statementsInfo));
  } catch {
    // Do nothing
  } finally {
    yield put(UpdateIsLoadingStatementsInfo(false));
  }
}

/**
 * Revalidate statements stats.
 *
 * @yields
 */
function* GetStatementsStatsSaga() {
  try {
    yield put(UpdateIsLoadingStatementsStats(true));
    const statementsInfo: StatementStats[] = yield call(ProtectedCall, getStatementsStats);
    yield put(UpdateStatementsStats(statementsInfo));
  } catch {
    // Do nothing
  } finally {
    yield put(UpdateIsLoadingStatementsStats(false));
  }
}

/**
 * Revalidate statement additional data (info and statistics).
 *
 * @yields
 */
function* GetStatementsAdditionalData() {
  yield all([fork(GetStatementsInfoSaga), fork(GetStatementsStatsSaga)]);
}
