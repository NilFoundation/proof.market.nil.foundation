/**
 * @file Api helpers.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { TradeOrder } from 'src/models';
import { getRuntimeConfigOrThrow } from 'src/utils';

const db = getRuntimeConfigOrThrow().DBMS_DEFAULT_DATABASE;
const apiVersion = getRuntimeConfigOrThrow().API_VERSION;
const baseUrl = getRuntimeConfigOrThrow().BASE_API_URL;

/**
 * Get orders parameters.
 */
export type GetOrdersParameters = {
    statement_key?: string;
    limit?: number;
} & Partial<TradeOrder>;

/**
 * Api base url.
 */
export const apiBaseUrl = `${baseUrl}/_db/${db}/${apiVersion}`;

/**
 * @param parameters Parameters.
 * @param [limit] Limit.
 * @param [startFrom] Start from.
 * @returns New url to get orders by parameters.
 */
export const getApiUrlByParameters = (
    parameters: GetOrdersParameters,
    limit?: number,
    startFrom?: number,
): string => {
    let resultStr = '?';

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
