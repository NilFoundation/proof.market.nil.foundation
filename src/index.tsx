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
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { BaseProvider } from 'baseui';
import App from './App';
import { store } from './redux';
import { configureSentry } from './sentry';
import { reportWebVitals } from './reportWebVitals';
import configureGA from './ga';
//import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { getRuntimeConfigOrThrow, checkRuntimeConfig } from './utils';
import { theme } from './baseuiTheme';
import './index.scss';

checkRuntimeConfig();
configureSentry();
configureGA();

const engine = new Styletron();

render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={getRuntimeConfigOrThrow().GOOGLE_AUTH_CLIENT_ID!}>
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
        </GoogleOAuthProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// TODO - enable service-workier in vite build
//serviceWorkerRegistration.registerServiceWorker();
reportWebVitals();
