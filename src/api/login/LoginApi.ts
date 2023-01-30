/**
 * @file Api.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createBearerHttpClient } from '../common';
import { LoginData, AuthData } from '../../models';

const httpFetcher = createBearerHttpClient('/user', false, false);

/**
 * Login.
 *
 * @param loginData - Login data.
 * @returns .
 */
export const login = (loginData: LoginData): Promise<AuthData> =>
    httpFetcher.post<AuthData, LoginData>('/signin', loginData);

/**
 * Renew jtw tocken.
 *
 * @param username Username.
 * @returns .
 */
export const renewJwt = (username: string): Promise<AuthData | Record<string, never>> =>
    httpFetcher.post('/renew', { username });
