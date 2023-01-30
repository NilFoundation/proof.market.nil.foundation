/**
 * @file Root index.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

// eslint-disable-next-line import/order
import './polyfills';

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
import './index.scss';

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
reportWebVitals();
