/**
 * @file Api.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { GoogleUserinfo } from '@/models';
import { createApiClient } from '../common';

const httpFetcher = createApiClient({
    baseUrl: 'https://www.googleapis.com/oauth2/v1/userinfo',
    shouldUseApiBaseUrl: false,
});

/**
 * Get google user profile info.
 *
 * @param accessToken - Google access token.
 * @returns .
 */
export const getGoogleProfileInfo = (accessToken: string): Promise<GoogleUserinfo> =>
    httpFetcher
        .get(`?access_token=${accessToken}`, {
            headers: {
                Accept: 'application/json',
            },
        })
        .json();
