/**
 * @file App.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Suspense } from 'react';
import { ErrorBoundary, withProfiler } from '@sentry/react';
import { Helmet } from 'react-helmet-async';
import { FullScreenLoader, GALocationTracker, PageVisibilityDetector } from './components';
import { Router, routesConfig as desktopRoutesConfig } from './features/routing';
import ErrorView from './views/ErrorView';
import { getRuntimeConfigOrThrow } from './utils';
import { useBreakpoint } from './features/shared';
import { MobileRouter } from './features/mobile';

const baseDocumentTitle = getRuntimeConfigOrThrow().SITE_DEFAULT_TITLE;

/**
 * @returns App.
 */
function App(): ReactElement {
    const bp = useBreakpoint();

    return (
        <ErrorBoundary fallback={<ErrorView />}>
            <Helmet
                titleTemplate={`${baseDocumentTitle} | %s`}
                defaultTitle={baseDocumentTitle}
            />
            <Suspense fallback={<FullScreenLoader />}>
                {bp === 'sm' ? <MobileRouter /> : <Router config={desktopRoutesConfig} />}
            </Suspense>
            <GALocationTracker />
            <PageVisibilityDetector />
        </ErrorBoundary>
    );
}

export default withProfiler(App);
