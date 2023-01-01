/**
 * @file Api.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createBearerHttpClient } from '../common';

const db = process.env.REACT_APP_DBMS_DEFAULT_DATABASE;
const apiUrl = `_db/${db}/${db}/user/`;
const httpFetcher = createBearerHttpClient(apiUrl);

/**
 * Get user balance.
 *
 * @param user - User to get balance.
 * @returns .
 */
export const getUserBalance = (user: string): Promise<number | undefined> =>
    httpFetcher.get(`${user}/balance`);