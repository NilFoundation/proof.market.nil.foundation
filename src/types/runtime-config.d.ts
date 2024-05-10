/* eslint-disable @typescript-eslint/no-namespace */

/**
 * @file Typings.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

const keys = [
  'BASE_API_URL',
  'DBMS_DEFAULT_DATABASE',
  'API_VERSION',
  'READONLY_USER',
  'SITE_DEFAULT_TITLE',
  'PROOFMARKET_TOOLCHAIN_REPO',
  'REVALIDATE_DATA_INTERVAL',
  'GA_TRACKING_ID',
  'CIRCUIT_DEVELOPER_GUIDE_URL',
  'API_RESPONSE_WAIT_TIMEOUT',
  'DATADOG_APPLICATION_ID',
  'DATADOG_CLIENT_TOKEN',
  'DATADOG_SITE',
  'DATADOG_SERVICE_NAME',
] as const;

type RuntimConfigKeys = (typeof keys)[number];

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    RUNTIME_CONFIG: Record<RuntimConfigKeys, string | undefined>;
  }
}

export {};
