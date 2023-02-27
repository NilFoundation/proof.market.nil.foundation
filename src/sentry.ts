/**
 * @file Sentry configuration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { getRuntimeConfigOrThrow } from './utils';

/**
 * Configures sentry for app.
 *
 * @see {@link https://docs.sentry.io/platforms/javascript/guides/react/}
 */
export const configureSentry = (): void => {
    if (process.env.NODE_ENV !== 'production') {
        return;
    }

    const dsn = getRuntimeConfigOrThrow().SENTRY_DSN;

    if (!dsn) {
        return;
    }

    Sentry.init({
        dsn,
        integrations: [new BrowserTracing()],
        tracesSampleRate: 0.2,
        denyUrls: [
            // Chrome extensions
            /extensions\//i,
            /^chrome:\/\//i,
        ],
    });
};
