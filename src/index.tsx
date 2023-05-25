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
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import { BaseuiProvider } from './BaseuiProvider';
import { store } from './redux';
import { configureSentry } from './sentry';
import { reportWebVitals } from './reportWebVitals';
import configureGA from './ga';
//import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { checkRuntimeConfig } from './checkRuntimeConfig';
import { getRuntimeConfigOrThrow } from './utils';
import './index.scss';

checkRuntimeConfig();
configureSentry();
configureGA();

render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={getRuntimeConfigOrThrow().GOOGLE_AUTH_CLIENT_ID!}>
            <HelmetProvider>
                <Provider store={store}>
                    <HashRouter>
                        <BaseuiProvider>
                            <App />
                        </BaseuiProvider>
                    </HashRouter>
                </Provider>
            </HelmetProvider>
        </GoogleOAuthProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// TODO - enable service-workier in vite build
//serviceWorkerRegistration.registerServiceWorker();
reportWebVitals();
