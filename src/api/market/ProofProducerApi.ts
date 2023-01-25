/**
 * @file Api.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { LastProofProducer } from 'src/models';
import { apiBaseUrl, createBearerHttpClient } from '../common';

const httpFetcher = createBearerHttpClient(`${apiBaseUrl}/producer`);

/**
 * Get last proof producer data for all circuits.
 *
 * @returns .
 */
export const getLastProofProducerData = (): Promise<Array<LastProofProducer | null>> =>
    httpFetcher.get('/last');
