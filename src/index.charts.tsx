/**
 * @file Root index.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import type { RouteObject } from 'react-router-dom';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { store } from './redux';
import { checkRuntimeConfig } from './checkRuntimeConfig';
import { RouterParam } from './enums';
import ChartsView from './views/ChartsView';
import ChartsLayout from './layouts/ChartsLayout';
import { Path } from './routing';
import ErrorView from './views/ErrorView';
import Page404 from './views/404';
import './index.scss';

checkRuntimeConfig();

const routes: RouteObject[] = [
    {
        element: <ChartsLayout />,
        errorElement: <ErrorView />,
        children: [
            {
                path: `:${RouterParam.statementName}/:${RouterParam.chartType}`,
                element: <ChartsView />,
            },
            {
                path: Path.any,
                element: <Page404 showGoBackButton={false} />,
            },
        ],
    },
];

const router = createHashRouter(routes);

render(
    <React.StrictMode>
        <Provider store={store}>
            <HelmetProvider>
                <RouterProvider router={router} />
            </HelmetProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);
