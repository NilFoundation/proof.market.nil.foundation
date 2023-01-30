/**
 * @file Bearer http client.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { AxiosRequestConfig } from 'axios';
import { HttpClient } from './HttpClient';
import { getItemFromLocalStorage } from '../../packages/LocalStorage';
import { apiBaseUrl } from './apiHelpers';

const { REACT_APP_BASE_API_URL } = process.env;
const baseUrl = `${REACT_APP_BASE_API_URL}/${apiBaseUrl}`;

/**
 * Creates HTTP client with authorization.
 *
 * @param url - Url to make api calls with.
 * @param withCredentials - Include credentials.
 * @param injectToken - Should inject token.
 * @returns Bearer http client.
 */
export const createBearerHttpClient = (
    url?: string,
    withCredentials?: boolean,
    injectToken = true,
): HttpClient =>
    new HttpClient(
        {
            baseURL: url ? `${baseUrl}/${url}` : baseUrl,
            withCredentials,
        },
        injectToken ? client => client.interceptors.request.use(injectJwtToken) : undefined,
    );

const getJwtToken = (): string | undefined => {
    const tokenStorageKey = 'jwt';
    return getItemFromLocalStorage<string>(tokenStorageKey);
};

const injectJwtToken = (config: AxiosRequestConfig): AxiosRequestConfig => {
    const jwtToken = getJwtToken();
    if (jwtToken && config.headers) {
        config.headers.Authorization = `Bearer ${jwtToken}`;
    }
    return config;
};
