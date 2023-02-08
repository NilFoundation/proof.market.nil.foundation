/**
 * @file Api.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { Bid, CreateBid, TradeOrder } from 'src/models';
import { createApiClient, getApiUrlByParameters } from '../common';

const httpFetcher = createApiClient('/bid');

/**
 * Get bids by parameters.
 *
 * @param {Partial<TradeOrder>} parameters Parameters.
 * @param limit Response limit.
 * @param startFrom Start from.
 * @returns Bids.
 */
export const getBids = (
    parameters: Partial<TradeOrder>,
    limit?: number,
    startFrom?: number,
): Promise<Bid[]> => httpFetcher.get(getApiUrlByParameters(parameters, limit, startFrom)).json();

/**
 * Create Bid.
 *
 * @param data - Bid dto.
 * @returns Bid.
 */
export const createBid = (data: CreateBid): Promise<Bid> =>
    httpFetcher.post('', { json: data }).json();

/**
 * Remove Bid.
 *
 * @param bidToRemoveKey Bid to remove key.
 * @returns Ask.
 */
export const removeBid = (bidToRemoveKey: Bid['_key']): Promise<void> =>
    httpFetcher.delete(bidToRemoveKey).json();
