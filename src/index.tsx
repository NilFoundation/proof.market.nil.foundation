/**
 * @file Root index.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
// TODO - replace HashRouter with BrowserRouter after migrating from gh pages
import { HashRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { store } from './redux';
import { configureSentry } from './sentry';
import { reportWebVitals } from './reportWebVitals';
import configureGA from './ga';
//import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { checkRuntimeConfig } from './checkRuntimeConfig';
import './index.scss';

checkRuntimeConfig();
configureSentry();
configureGA();

render(
    <React.StrictMode>
        <HelmetProvider>
            <Provider store={store}>
                <HashRouter>
                    <App />
                </HashRouter>
            </Provider>
        </HelmetProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// TODO - enable service-workier in vite build
//serviceWorkerRegistration.registerServiceWorker();
reportWebVitals();
