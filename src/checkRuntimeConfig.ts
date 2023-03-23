/**
 * @file Check if all required runtimeConfig values are set.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { getRuntimeConfigOrThrow } from './utils';

const runtimeConfig = getRuntimeConfigOrThrow();

const requiredEnvs: Array<keyof typeof window.RUNTIME_CONFIG> = [
    'BASE_API_URL',
    'API_VERSION',
    'DBMS_DEFAULT_DATABASE',
    'READONLY_USER',
    'PROOFMARKET_TOOLCHAIN_REPO',
    'SITE_DEFAULT_TITLE',
    'GOOGLE_AUTH_CLIENT_ID',
];

/**
 * Check if all requred runtimeConfig values are set.
 *
 * @throws
 */
export const checkRuntimeConfig = () => {
    requiredEnvs.forEach(x => {
        if (!runtimeConfig[x]) {
            throw new Error(`${x} runtimeConfig value is required but not set`);
        }
    });

    if (!import.meta.env.PROD) {
        console.log('Required runtimeConfig values are set.');
    }
};
