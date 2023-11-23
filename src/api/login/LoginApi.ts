/**
 * @file Api.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { LoginData, AuthData } from '@/features/auth';
import { createApiClient } from '../common';

const httpFetcher = createApiClient('/user');

/**
 * Login.
 *
 * @param loginData - Login data.
 * @returns .
 */
export const login = (loginData: LoginData): Promise<AuthData> =>
  httpFetcher.post('signin', { json: loginData }).json();

/**
 * Renew jtw token.
 *
 * @param username Username.
 * @returns .
 */
export const renewJwt = (username: string): Promise<AuthData | Record<string, never>> =>
  httpFetcher.post('renew', { json: username }).json();
