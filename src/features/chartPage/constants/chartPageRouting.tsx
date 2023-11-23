/**
 * @file React routing.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { RouteObject } from 'react-router-dom';
import { RouterParam } from '@/enums';
import { Path } from '@/features/routing';
import ChartsView from '@/views/ChartsView';
import Page404 from '@/views/404';
import ErrorView from '@/views/ErrorView';
import Layout from '@/features/shared/components/Layout/Layout';

export const chartPageRoutes: RouteObject[] = [
  {
    element: <Layout />,
    errorElement: <ErrorView />,
    children: [
      {
        path: `:${RouterParam.statementName}/:${RouterParam.chartType}`,
        element: <ChartsView />,
      },
      {
        path: Path.any,
        element: <Page404 showRedirect={false} />,
      },
    ],
  },
];
