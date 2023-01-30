/**
 * @file Api.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createBearerHttpClient } from '../common';
import { RegisterData } from '../../models';

const httpFetcher = createBearerHttpClient('/user', false, false);

/**
 * Register user.
 *
 * @param registerData - Register data.
 * @returns .
 */
export const signUp = (registerData: RegisterData): Promise<RegisterData> =>
    httpFetcher.post('/signup', registerData);

/**
 * Check if username is unique.
 *
 * @param userNameToCheck Username to check uniqueness.
 * @returns True if username is unique.
 */
export const checkIsUsernameUnique = (userNameToCheck: string): Promise<boolean> =>
    httpFetcher.head(`/${userNameToCheck}`);
