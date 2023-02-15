/**
 * @file Api.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { OrderBookPriceStep } from 'src/enums';
import { createBearerHttpClient } from '../common';
import type { Circuit, OrderBookData } from '../../models';

/**
 * Get orderbook data options.
 */
export type OrderBookDataOptions = {
    priceStep?: keyof typeof OrderBookPriceStep;
    evalTimeStep?: number;
};

const httpFetcher = createBearerHttpClient('/book');

/**
 * Get orderBook data by statement key.
 *
 * @param statementKey Statement key.
 * @param {OrderBookDataOptions} options Options.
 * @returns Orderbook data.
 */
export const getOrderBookData = (
    statementKey: Circuit['_key'],
    options?: OrderBookDataOptions,
): Promise<OrderBookData> =>
    httpFetcher.get(`/${statementKey}${options ? getUrlFromOptions(options) : ''}`);

const getUrlFromOptions = ({ priceStep, evalTimeStep }: OrderBookDataOptions): string => {
    let url = '/?';

    if (priceStep) {
        url += `dc=${priceStep}${evalTimeStep ? '&' : ''}`;
    }

    if (evalTimeStep) {
        url += `dt=${evalTimeStep}`;
    }

    return url;
};