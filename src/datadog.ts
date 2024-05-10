/**
 * @file Datadog rum configuration.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { datadogRum } from '@datadog/browser-rum';
import { getRuntimeConfigOrThrow } from './utils';

/**
 * Configures Datadog Real User Monitoring (RUM) for the application.
 *
 * @see {@link https://docs.datadoghq.com/real_user_monitoring/browser/}
 */
export const configureDatadogRUM = (): void => {
  // if (!import.meta.env.PROD) {
  //   return;
  // }

  const { DATADOG_APPLICATION_ID, DATADOG_CLIENT_TOKEN, DATADOG_SERVICE_NAME, DATADOG_SITE } =
    getRuntimeConfigOrThrow();

  if (!DATADOG_APPLICATION_ID || !DATADOG_CLIENT_TOKEN || !DATADOG_SERVICE_NAME || !DATADOG_SITE) {
    return;
  }

  datadogRum.init({
    applicationId: DATADOG_APPLICATION_ID,
    clientToken: DATADOG_CLIENT_TOKEN,
    site: DATADOG_SITE,
    service: DATADOG_SERVICE_NAME,
    env: 'production',
    sessionSampleRate: 100,
    sessionReplaySampleRate: 100,
    trackResources: false,
    trackLongTasks: false,
    trackUserInteractions: false,
    silentMultipleInit: true,
    allowFallbackToLocalStorage: true,
  });
};
