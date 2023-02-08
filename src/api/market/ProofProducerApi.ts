/**
 * @file Api.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { LastProofProducer } from 'src/models';
import { createApiClient } from '../common';

const httpFetcher = createApiClient('/producer');

/**
 * Get last proof producer data for all circuits.
 *
 * @returns .
 */
export const getLastProofProducerData = (): Promise<Array<LastProofProducer | null>> =>
    httpFetcher.get('last').json();
