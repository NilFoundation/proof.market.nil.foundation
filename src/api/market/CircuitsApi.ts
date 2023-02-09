/**
 * @file Api.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { Circuit, CircuitInfo, CircuitStats } from 'src/models';
import { createApiClient } from '../common';

const httpFetcher = createApiClient('/statement');

/**
 * Get circuits.
 *
 * @returns Circuit list.
 */
export const getCircuits = (): Promise<Circuit> => httpFetcher.get('').json();

/**
 * Get circuits info.
 *
 * @returns .
 */
export const getCircuitsInfo = (): Promise<CircuitInfo> => httpFetcher.get(`?info`).json();

/**
 * Get circuits stats.
 *
 * @returns .
 */
export const getCircuitsStats = (): Promise<CircuitStats> => httpFetcher.get(`?statistics`).json();
