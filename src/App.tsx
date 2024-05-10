/**
 * @file App.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Helmet } from 'react-helmet-async';
import { FullScreenLoader, GALocationTracker, PageVisibilityDetector } from './components';
import { Router, routesConfig as desktopRoutesConfig } from './features/routing';
import ErrorView from './views/ErrorView';
import { getRuntimeConfigOrThrow } from './utils';
import { useBreakpoint } from './features/shared';
import { MobileRouter } from './features/mobile';
import { NotificationContainer } from './features/notifications';
import { BREAKPOINT } from './styles/Breakpoint';

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
      <NotificationContainer>
        <Suspense fallback={<FullScreenLoader />}>
          {bp === BREAKPOINT.SM ? <MobileRouter /> : <Router config={desktopRoutesConfig} />}
        </Suspense>
      </NotificationContainer>
      <GALocationTracker />
      <PageVisibilityDetector />
    </ErrorBoundary>
  );
}

export default App;
