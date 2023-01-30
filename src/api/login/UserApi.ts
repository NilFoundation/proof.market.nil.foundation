/**
 * @file Api.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createBearerHttpClient } from '../common';

const httpFetcher = createBearerHttpClient('/user');

/**
 * Get user balance.
 *
 * @param user - User to get balance.
 * @returns .
 */
export const getUserBalance = (user: string): Promise<number | undefined> =>
    httpFetcher.get(`/${user}/balance`);
