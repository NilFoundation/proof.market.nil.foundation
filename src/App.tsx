/**
 * @file App.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Suspense } from 'react';
import { NotificationProvider, Spinner } from '@nilfoundation/react-components';
import { ErrorBoundary, withProfiler } from '@sentry/react';
import { Helmet } from 'react-helmet-async';
import { GALocationTracker, PageVisibilityDetector } from './components';
import { Router } from './routing';
import ErrorView from './views/ErrorView';
import { getRuntimeConfigOrThrow } from './utils';

const baseDocumentTitle = getRuntimeConfigOrThrow().SITE_DEFAULT_TITLE;
const renderLoader = () => (
    <div style={{ height: '100vh' }}>
        <Spinner grow />
    </div>
);

/**
 * @returns App.
 */
function App(): ReactElement {
    return (
        <ErrorBoundary fallback={<ErrorView />}>
            <NotificationProvider>
                <Helmet
                    titleTemplate={`${baseDocumentTitle} | %s`}
                    defaultTitle={baseDocumentTitle}
                />
                <Suspense fallback={renderLoader()}>
                    <Router />
                </Suspense>
            </NotificationProvider>
            <GALocationTracker />
            <PageVisibilityDetector />
        </ErrorBoundary>
    );
}

export default withProfiler(App);
