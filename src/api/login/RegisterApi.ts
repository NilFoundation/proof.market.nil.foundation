/**
 * @file Api.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { RegisterData } from '@/features/auth';
import { createApiClient } from '../common';

const httpFetcher = createApiClient({
  baseUrl: '/user',
  injectToken: false,
});

/**
 * Register user.
 *
 * @param registerData - Register data.
 * @returns .
 */
export const signUp = (registerData: RegisterData): Promise<RegisterData> =>
  httpFetcher.post('signup', { json: registerData }).json();

/**
 * Check if username is unique.
 *
 * @param userNameToCheck Username to check uniqueness.
 * @returns True if username is unique.
 */
export const checkIsUsernameUnique = (userNameToCheck: string): Promise<boolean> =>
  httpFetcher.head(userNameToCheck).json();
