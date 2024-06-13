/**
 * @file Api.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { LastProofProducer } from '@/features/lastProofProducer';
import { createApiClient } from '../common';

const httpFetcher = createApiClient('/producer');

/**
 * Get last proof producer data for all statements.
 *
 * @returns .
 */
export const getLastProofProducerData = (): Promise<Array<LastProofProducer | null>> =>
  httpFetcher.get('last').json();
