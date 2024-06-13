/**
 * @file Http client.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { Options } from 'ky';
import ky from 'ky';
import { LocalStorageAPI } from '@/packages/localStorageAdapter';
import { getRuntimeConfigOrThrow } from '@/utils';
import { apiBaseUrl } from './apiHelpers';

/**
 * Create api client settings.
 */
type CreateApiClientSettings = {
  baseUrl?: string;
  injectToken?: boolean;
  options?: Omit<Options, 'prefixUrl'>;
  shouldUseApiBaseUrl?: boolean;
};

/**
 * Create api client parameters. Could create api client with parameters or just prvide the baseUrl string.
 */
export type CreateApiClientParameters = CreateApiClientSettings | string;

const defaultTimeout = 20000;

/**
 * Create api client.
 *
 * @param {CreateApiClientParameters} params Create api client parameters.
 * @returns Api client.
 */
export const createApiClient = (params: CreateApiClientParameters) => {
  let baseOptions = {
    baseUrl: '',
    injectToken: true,
    options: {},
    shouldUseApiBaseUrl: true,
  };

  if (typeof params === 'string') {
    baseOptions.baseUrl = params;
  } else {
    baseOptions = Object.assign(baseOptions, params);
  }

  const { shouldUseApiBaseUrl, baseUrl, options, injectToken } = baseOptions;
  const { API_RESPONSE_WAIT_TIMEOUT } = getRuntimeConfigOrThrow();

  return ky.create({
    prefixUrl: `${shouldUseApiBaseUrl ? apiBaseUrl : ''}${baseUrl}`,
    hooks: {
      beforeRequest: [
        request => {
          if (!injectToken) {
            return request;
          }

          request.headers.set('Authorization', `Bearer ${LocalStorageAPI.getItem('userToken')}`);
        },
      ],
    },
    timeout: Number(API_RESPONSE_WAIT_TIMEOUT) ?? defaultTimeout,
    ...options,
  });
};
