/**
 * @file Api.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { Request, CreateRequest, TradeOrder } from '@/models';
import { createApiClient, getApiUrlByParameters } from '../common';

const httpFetcher = createApiClient('/request');

/**
 * Get requests by parameters.
 *
 * @param {Partial<TradeOrder>} parameters Parameters.
 * @param limit Response limit.
 * @param startFrom Start from.
 * @returns Requests.
 */
export const getRequests = (
    parameters: Partial<TradeOrder>,
    limit?: number,
    startFrom?: number,
): Promise<Request[]> =>
    httpFetcher.get(getApiUrlByParameters(parameters, limit, startFrom)).json();

/**
 * Create Request.
 *
 * @param data - Request dto.
 * @returns Request.
 */
export const createRequest = (data: CreateRequest): Promise<Request> =>
    httpFetcher.post('', { json: data }).json();

/**
 * Remove Request.
 *
 * @param requestToRemoveKey Request to remove key.
 * @returns Proposal.
 */
export const removeRequest = (requestToRemoveKey: Request['_key']): Promise<void> =>
    httpFetcher.delete(requestToRemoveKey).json();
