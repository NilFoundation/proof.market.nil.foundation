/**
 * @file Api.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { Circuit, CircuitInfo, CircuitStats } from 'src/models';
import { createBearerHttpClient } from '../common';

const httpFetcher = createBearerHttpClient('/statement');

/**
 * Get circuits.
 *
 * @returns Circuit list.
 */
export const getCircuits = (): Promise<Circuit> => httpFetcher.get('');

/**
 * Get circuits info.
 *
 * @returns .
 */
export const getCircuitsInfo = (): Promise<CircuitInfo> => httpFetcher.get(`/?info`);

/**
 * Get circuits stats.
 *
 * @returns .
 */
export const getCircuitsStats = (): Promise<CircuitStats> => httpFetcher.get(`/?statistics`);
