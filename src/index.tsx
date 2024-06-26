/**
 * @file Root index.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createTheme } from '@nilfoundation/ui-kit';
// TODO - replace HashRouter with BrowserRouter after migrating from gh pages
import { HashRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { BaseProvider } from 'baseui';
import App from './App';
import { store } from './redux';
import { initOpentelemetry } from './opentelemetry';
import { reportWebVitals } from './reportWebVitals';
import configureGA from './ga';
//import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { checkRuntimeConfig } from './utils';

checkRuntimeConfig();
configureGA();
initOpentelemetry();

const engine = new Styletron();
const { theme } = createTheme(engine, { enableDefaultFonts: false });

const root = createRoot(document.getElementById('root') || document.body);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <HashRouter>
          <StyletronProvider value={engine}>
            <BaseProvider theme={theme}>
              <App />
            </BaseProvider>
          </StyletronProvider>
        </HashRouter>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>,
);

// TODO - enable service-workier in vite build
//serviceWorkerRegistration.registerServiceWorker();
reportWebVitals();
