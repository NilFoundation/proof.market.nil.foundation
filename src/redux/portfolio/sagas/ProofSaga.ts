/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { call, put, select } from 'redux-saga/effects';
import type { SagaIterator } from '@redux-saga/core';
import { getProofs } from 'src/api';
import type { Proof } from 'src/models';
import { createUrlParamSelector } from 'src/redux/common';
import { RouterParam } from 'src/enums';
import {
    UpdateProofList,
    UpdateIsLoadingProofs,
    UpdateProofsError,
    UpdateSelectedProofKey,
} from '../actions';
import { ProtectedCall, selectUserName } from '../../login';
import { selectSelectedProofKey } from '../selectors';

/**
 * Get proof saga.
 *
 * @yields
 */
export function* GetProofSaga(): SagaIterator<void> {
    const user: ReturnType<typeof selectUserName> = yield select(selectUserName);

    if (!user) {
        return;
    }

    try {
        yield put(UpdateProofsError(false));
        yield put(UpdateIsLoadingProofs(true));

        const proofList: Proof[] = yield call(ProtectedCall, getProofs);

        if (proofList !== undefined) {
            yield put(UpdateProofList(proofList));
        }
    } catch (e) {
        yield put(UpdateProofsError(true));
    } finally {
        yield put(UpdateIsLoadingProofs(false));
    }
}

/**
 * Selects first circuit in list after circuits list update (if none is selected).
 *
 * @param {ReturnType<typeof UpdateProofList>} action - Action.
 * @yields
 */
export function* SelectProofSaga({
    payload: proofs,
}: ReturnType<typeof UpdateProofList>): SagaIterator<void> {
    const currentProofId = yield select(selectSelectedProofKey);

    if (currentProofId) {
        return;
    }

    if (!proofs.length) {
        return;
    }

    const urlParamKey: string = yield select(createUrlParamSelector(RouterParam.proofKey));

    const shouldSelectFromUrl = proofs.some(x => x._key === urlParamKey);
    const keyToSelect = shouldSelectFromUrl ? urlParamKey : proofs[0]._key;

    yield put(UpdateSelectedProofKey(keyToSelect));
}
