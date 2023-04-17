/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { call, fork, put, takeLatest, select } from 'redux-saga/effects';
import type { SagaIterator } from '@redux-saga/core';
import type { OrderBookDataOptions } from '@/api';
import { getProposals, getOrderBookData } from '@/api';
import { ProtectedCall } from '@/redux';
import type { Proposal, LastOrderData, OrderBookData, TradeOrder } from '@/models';
import { getRuntimeConfigOrThrow } from '@/utils';
import {
    UpdateSelectedStatementKey,
    UpdateOrderBookData,
    UpdateOrderBookDataIsLoading,
    UpdateOrderBookDataError,
    UpdateOrderBookPriceStep,
    UpdateOrderBookLastOrderData,
} from '../actions';
import { selectCurrentStatementKey, selectOrderBookPriceStep } from '../selectors';
import { RevalidateSaga } from '../../common';

const revalidateDataDelay = Number(getRuntimeConfigOrThrow().REVALIDATE_DATA_INTERVAL) || 3000;

/**
 * Orderbook saga.
 *
 * @yields
 */
export function* OrderBookSaga(): SagaIterator<void> {
    yield takeLatest([UpdateSelectedStatementKey, UpdateOrderBookPriceStep], function* () {
        yield put(UpdateOrderBookData({ proposals: [], requests: [] }));
        yield put(UpdateOrderBookLastOrderData(undefined));

        yield fork(GetOrderBookDataSaga);
        yield fork(GetLastOrderDataSaga);
    });

    yield fork(RevalidateSaga, GetOrderBookDataSaga, revalidateDataDelay);
    yield fork(RevalidateSaga, GetLastOrderDataSaga, revalidateDataDelay);
}

/**
 * Get orderbook data saga.
 *
 * @yields
 */
function* GetOrderBookDataSaga(): SagaIterator<void> {
    const currentStatementKey: string | undefined = yield select(selectCurrentStatementKey);
    const currentPriceStep = yield select(selectOrderBookPriceStep);
    const apiCallOptions: OrderBookDataOptions = {
        priceStep: currentPriceStep,
    };

    if (currentStatementKey === undefined) {
        return;
    }

    try {
        yield put(UpdateOrderBookDataError(false));
        yield put(UpdateOrderBookDataIsLoading(true));

        const apiCallResult: OrderBookData = yield call(
            ProtectedCall,
            getOrderBookData,
            currentStatementKey,
            apiCallOptions,
        );

        if (apiCallResult !== undefined) {
            yield put(UpdateOrderBookData(apiCallResult));
        }
    } catch (e) {
        yield put(UpdateOrderBookDataError(true));
    } finally {
        yield put(UpdateOrderBookDataIsLoading(false));
    }
}

/**
 * Get last order data saga.
 *
 * @yields
 */
function* GetLastOrderDataSaga(): SagaIterator<void> {
    const currentStatementKey: string | undefined = yield select(selectCurrentStatementKey);

    if (currentStatementKey === undefined) {
        return;
    }

    try {
        const apiCallParameters: Partial<TradeOrder> = {
            statement_key: currentStatementKey,
            status: 'completed',
        };

        const lastTwoCompletedProposals: Proposal[] = yield call(
            ProtectedCall,
            getProposals,
            apiCallParameters,
            2,
        );

        if (lastTwoCompletedProposals === undefined || lastTwoCompletedProposals.length === 0) {
            yield put(UpdateOrderBookLastOrderData(undefined));

            return;
        }

        const lastOrderData = getLastOrderData(lastTwoCompletedProposals);
        yield put(UpdateOrderBookLastOrderData(lastOrderData));
    } catch (e) {
        yield put(UpdateOrderBookLastOrderData(undefined));
    }
}

/**
 * Calculates last order data.
 *
 * @param lastTwoCompletedProposals Proposals.
 * @returns Last order data.
 */
const getLastOrderData = (lastTwoCompletedProposals: Proposal[]): LastOrderData => {
    const latestCost = lastTwoCompletedProposals.at(0)?.cost;
    const prevCost = lastTwoCompletedProposals.at(1)?.cost;

    const getType = () => (latestCost! > prevCost! ? 'grow' : 'loss');
    const type = latestCost && prevCost ? getType() : undefined;

    return {
        cost: latestCost,
        eval_time: lastTwoCompletedProposals.at(0)?.eval_time,
        type,
    };
};
