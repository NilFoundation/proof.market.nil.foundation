/**
 * @file Api.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { createApiClient } from '../common';

const httpFetcher = createApiClient('/user');

/**
 * Get user balance.
 *
 * @param user - User to get balance.
 * @returns .
 */
export const getUserBalance = (user: string): Promise<number | undefined> =>
  httpFetcher.get(`${user}/balance`).json();
