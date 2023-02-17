/**
 * @file Http client.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { Options } from 'ky';
import ky from 'ky';
import { getItemFromLocalStorage } from 'src/packages/LocalStorage';
import { apiBaseUrl } from './apiHelpers';

/**
 * Create api client.
 *
 * @param baseUrl Base api url.
 * @param injectToken Add Authorization header with token to all requests.
 * @param options Other options.
 * @returns Api client.
 */
export const createApiClient = (
    baseUrl = '',
    injectToken = true,
    options?: Omit<Options, 'prefixUrl'>,
) => {
    return ky.create({
        prefixUrl: `${apiBaseUrl}${baseUrl}`,
        hooks: {
            beforeRequest: [
                request => {
                    injectToken && request.headers.set('Authorization', `Bearer ${getJwtToken()}`);
                },
            ],
        },
        ...options,
    });
};

const getJwtToken = (): string | undefined => {
    const tokenStorageKey = 'jwt';
    return getItemFromLocalStorage<string>(tokenStorageKey);
};
