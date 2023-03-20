/**
 * @file Api helpers.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { getRuntimeConfigOrThrow } from '@/utils';

const db = getRuntimeConfigOrThrow().DBMS_DEFAULT_DATABASE;
const apiVersion = getRuntimeConfigOrThrow().API_VERSION;
const baseUrl = getRuntimeConfigOrThrow().BASE_API_URL;

/**
 * Api base url.
 */
export const apiBaseUrl = `${baseUrl}/_db/${db}/${apiVersion}`;

/**
 * @param parameters Parameters.
 * @param [limit] Limit.
 * @param [startFrom] Start from.
 * @param [baseUrl] Base url.
 * @returns New url to get orders by parameters.
 */
export const getApiUrlByParameters = <T extends Record<string, unknown>>(
    parameters: T,
    limit?: number,
    startFrom?: number,
    baseUrl = '',
): string => {
    let resultStr = baseUrl + '?';

    if (limit !== undefined) {
        resultStr += `limit=${limit}&`;
    }

    if (startFrom !== undefined) {
        resultStr += `skipped=${startFrom}&`;
    }

    const stringWithParams = `q=[${Object.entries(parameters)
        .map(([x, y]) => `{"key": "${x}", "value": "${y}"}`)
        .join(', ')}]`;

    return resultStr + stringWithParams;
};
