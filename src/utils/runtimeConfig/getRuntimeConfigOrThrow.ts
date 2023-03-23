/**
 * @file Utility function.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

const getRuntimeConfig = () => window.RUNTIME_CONFIG;

/**
 * Consider to use this method to access {@link window.RUNTIME_CONFIG} values to prevent uncaught runtime errors
 * when global RUNTIME_CONFIG variable is missing.
 *
 * @returns Runtime config or throws an error.
 * @throws
 */
export const getRuntimeConfigOrThrow = () => {
    const config = getRuntimeConfig();

    if (!config) {
        throw new Error('Runtime config is not set');
    }

    return config;
};
