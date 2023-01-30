/* eslint-disable @typescript-eslint/no-namespace */

/**
 * @file Typings.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

const envs = [
    'REACT_APP_BASE_API_URL',
    'REACT_APP_DBMS_DEFAULT_DATABASE',
    'REACT_APP_API_VERSION',
    'REACT_APP_READONLY_USER',
    'REACT_APP_SITE_DEFAULT_TITLE',
    'REACT_APP_PROOFMARKET_TOOLCHAIN_REPO',
    'REACT_APP_REVALIDATE_DATA_INTERVAL',
    'REACT_APP_SENTRY_DSN',
    'REACT_APP_GA_TRACKING_ID',
] as const;

type RequiredServerEnvKeys = (typeof envs)[number];

declare global {
    namespace NodeJS {
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface ProcessEnv extends Record<RequiredServerEnvKeys, string> {}
    }
}

export {};
