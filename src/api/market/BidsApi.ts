/**
 * @file Api.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { Bid, CreateBid, TradeOrder } from 'src/models';
import { createBearerHttpClient } from '../common';

/**
 * Get order parameters.
 */
export type GetOrdersParameters = {
    limit?: number;
} & Partial<TradeOrder>;

const db = process.env.REACT_APP_DBMS_DEFAULT_DATABASE;
const apiVersion = process.env.REACT_APP_API_VERSION;

const httpFetcher = createBearerHttpClient(`_db/${db}/${apiVersion}/bid`);

/**
 * Get bids by parameters.
 *
 * @param {GetOrdersParameters} parameters Parameters.
 * @param limit Response limit.
 * @returns Bids.
 */
export const getBids = (parameters: GetOrdersParameters, limit?: number): Promise<Bid[]> =>
    httpFetcher.get(
        `?${limit !== undefined ? `limit=${limit}&` : ''}q=[{${Object.entries(parameters)
            .map(([x, y]) => `"key": "${x}", "value": "${y}"`)
            .join(', ')}}]`,
    );

/**
 * Create Bid.
 *
 * @param data - Bid dto.
 * @returns Bid.
 */
export const createBid = (data: CreateBid): Promise<Bid> => httpFetcher.post('', data);

/**
 * Remove Bid.
 *
 * @param bidToRemoveId Bid to remove id.
 * @returns Ask.
 */
export const removeBid = (bidToRemoveId: Bid['_key']): Promise<void> =>
    httpFetcher.delete(`/${bidToRemoveId}`);
