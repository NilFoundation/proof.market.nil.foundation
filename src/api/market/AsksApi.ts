/**
 * @file Api.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { Ask, CreateAsk } from '../../models';
import { createBearerHttpClient } from '../common';
import { GetOrdersParameters } from './BidsApi';

const httpFetcher = createBearerHttpClient('/ask');

/**
 * Get asks by parameters.
 *
 * @param {GetOrdersParameters} parameters Parameters.
 * @param limit Response limit.
 * @returns Asks.
 */
export const getAsks = (parameters: GetOrdersParameters, limit?: number): Promise<Ask[]> =>
    httpFetcher.get(
        `?${limit !== undefined ? `limit=${limit}&` : ''}q=[{${Object.entries(parameters)
            .map(([x, y]) => `"key": "${x}", "value": "${y}"`)
            .join(', ')}}]`,
    );

/**
 * Create Ask.
 *
 * @param data Ask dto.
 * @returns Ask.
 */
export const createAsk = (data: CreateAsk): Promise<Ask> => httpFetcher.post('', data);

/**
 * Remove Ask.
 *
 * @param askToRemoveId Ask to remove id.
 * @returns Ask.
 */
export const removeAsk = (askToRemoveId: Ask['_key']): Promise<void> =>
    httpFetcher.delete(`/${askToRemoveId}`);
