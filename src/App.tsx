/**
 * @file App.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Suspense } from 'react';
import { NotificationProvider } from '@nilfoundation/react-components';
import { ErrorBoundary, withProfiler } from '@sentry/react';
import { Helmet } from 'react-helmet-async';
import { FullScreenLoader, GALocationTracker, PageVisibilityDetector } from './components';
import { Router, routesConfig as baseRoutesConfig } from './features/routing';
import ErrorView from './views/ErrorView';
import { getRuntimeConfigOrThrow } from './utils';
import { useWindowDimensions } from './features/shared';
import { mobileRoutesConfig } from './features/mobile';

const baseDocumentTitle = getRuntimeConfigOrThrow().SITE_DEFAULT_TITLE;

/**
 * @returns App.
 */
function App(): ReactElement {
    const { width } = useWindowDimensions();
    const routesConfig = width < 600 ? mobileRoutesConfig : baseRoutesConfig;

    return (
        <ErrorBoundary fallback={<ErrorView />}>
            <NotificationProvider>
                <Helmet
                    titleTemplate={`${baseDocumentTitle} | %s`}
                    defaultTitle={baseDocumentTitle}
                />
                <Suspense fallback={<FullScreenLoader />}>
                    <Router config={routesConfig} />
                </Suspense>
            </NotificationProvider>
            <GALocationTracker />
            <PageVisibilityDetector />
        </ErrorBoundary>
    );
}

export default withProfiler(App);
