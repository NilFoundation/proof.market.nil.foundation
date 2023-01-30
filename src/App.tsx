/**
 * @file App.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, Suspense } from 'react';
import { NotificationProvider, Spinner } from '@nilfoundation/react-components';
import { ErrorBoundary, withProfiler } from '@sentry/react';
import { Helmet } from 'react-helmet-async';
import { GALocationTracker, PageVisibilityDetector } from './components';
import { Router } from './routing';
import ErrorView from './views/ErrorView';

const baseDocumentTitle = process.env.REACT_APP_SITE_DEFAULT_TITLE;

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
                <Suspense fallback={<Spinner grow />}>
                    <Router />
                </Suspense>
            </NotificationProvider>
            <GALocationTracker />
            <PageVisibilityDetector />
        </ErrorBoundary>
    );
}

export default withProfiler(App);
