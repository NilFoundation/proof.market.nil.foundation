/**
 * @file React routing.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import ProtectedRoute from '@/components/login/ProtectedRoute/ProtectedRoute';
import RouterReduxConnector from '@/components/common/RouterReduxConnector/RouterReduxConnector';
import { Path } from '@/features/routing';
import { RouterParam } from '@/enums';
import MobileLayout from '../components/mobileLayout/MobileLayout';
import MobileViewFactory from '../components/mobileViewFactory/MobileViewFactory';

const Page404 = lazy(() => import('../../../views/404'));

/**
 * Mobile version routes.
 */
export const mobileRoutesConfig: RouteObject[] = [
  {
    element: <RouterReduxConnector />,
    children: [
      {
        path: Path.root,
        element: (
          <Navigate
            to={Path.market}
            replace
          />
        ),
      },
      {
        element: <MobileLayout />,
        children: [
          {
            element: <ProtectedRoute readonlyAccess />,
            children: [
              {
                path: Path.market,
                element: <MobileViewFactory />,
                children: [
                  {
                    path: `:${RouterParam.statementName}`,
                    element: <MobileViewFactory />,
                  },
                ],
              },
            ],
          },
          {
            path: Path.any,
            element: <Page404 />,
          },
        ],
      },
    ],
  },
];
