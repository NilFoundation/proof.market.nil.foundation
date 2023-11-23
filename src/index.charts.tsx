/**
 * @file Root index.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { store } from './redux';
import { checkRuntimeConfig } from './utils';
import { chartPageRoutes } from './features/chartPage';

checkRuntimeConfig();

const router = createHashRouter(chartPageRoutes);
const root = createRoot(document.getElementById('root') || document.body);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </Provider>
  </React.StrictMode>,
);
