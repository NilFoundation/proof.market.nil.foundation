/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { call, put, select } from 'redux-saga/effects';
import type { SagaIterator } from '@redux-saga/core';
import { getPortfolioProposalsInfo } from '@/api';
import type { RootStateType } from '@/redux/RootStateType';
import { createUrlParamSelector } from '@/redux/common';
import { RouterParam } from '@/enums';
import { ProtectedCall, selectUserName } from '../../login';
import {
  UpdateIsErrorPortfolioProposalsInfo,
  UpdateIsLoadingPortfolioProposalsInfo,
  UpdateSelectedPortfolioProposalsInfoKey,
  UpdatePortfolioProposalsInfo,
} from '../actions';

/**
 * Get proof portfolio proposals info saga.
 *
 * @yields
 */
export function* PortfolioProposalsInfoSaga(): SagaIterator<void> {
  const user: ReturnType<typeof selectUserName> = yield select(selectUserName);

  if (!user) {
    return;
  }

  try {
    yield put(UpdateIsErrorPortfolioProposalsInfo(false));
    yield put(UpdateIsLoadingPortfolioProposalsInfo(true));

    const proposalsInfo = yield call(ProtectedCall, getPortfolioProposalsInfo);

    if (proposalsInfo !== undefined) {
      yield put(UpdatePortfolioProposalsInfo(proposalsInfo));
    }
  } catch (e) {
    yield put(UpdateIsErrorPortfolioProposalsInfo(true));
  } finally {
    yield put(UpdateIsLoadingPortfolioProposalsInfo(false));
  }
}

/**
 * Selects portfolio proposals info.
 *
 * @param {ReturnType<typeof UpdatePortfolioProposalsInfo>} action - Action.
 * @yields
 */
export function* SelectPortfolioProposalsInfoSaga({
  payload: proposalsInfo,
}: ReturnType<typeof UpdatePortfolioProposalsInfo>): SagaIterator<void> {
  const currentSelectedProposalsInfoKey = yield select(
    (s: RootStateType) => s.portfolioProposalsInfo.selectedKey,
  );

  if (currentSelectedProposalsInfoKey !== undefined) {
    return;
  }

  if (!proposalsInfo.length) {
    return;
  }

  const urlParamKey: string = yield select(
    createUrlParamSelector(RouterParam.portfolioProposalsInfoStatementName),
  );

  const shouldSelectFromUrl = proposalsInfo.some(x => x._key === urlParamKey);
  const keyToSelect = shouldSelectFromUrl ? urlParamKey : proposalsInfo[0]._key;

  yield put(UpdateSelectedPortfolioProposalsInfoKey(keyToSelect));
}
