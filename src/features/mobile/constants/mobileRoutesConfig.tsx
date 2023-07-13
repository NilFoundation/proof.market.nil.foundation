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
import { StatementsList } from '@/features/statementsList';
import { RouterParam } from '@/enums';
import MobileLayout from '../components/mobileLayout/MobileLayout';
import { MobilePath } from '../models/MobilePath';

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
                                children: [
                                    {
                                        index: true,
                                        element: (
                                            <Navigate
                                                to={MobilePath.statementsList}
                                                replace
                                            />
                                        ),
                                    },
                                    {
                                        path: MobilePath.statementsList,
                                        element: <StatementsList />,
                                        children: [
                                            {
                                                path: `:${RouterParam.statementName}`,
                                                element: <StatementsList />,
                                            },
                                        ],
                                    },
                                    {
                                        path: MobilePath.charts,
                                        element: <StatementsList />,
                                        children: [
                                            {
                                                path: `:${RouterParam.statementName}`,
                                                element: <StatementsList />,
                                            },
                                        ],
                                    },
                                    {
                                        path: MobilePath.lastProofProducer,
                                        element: <StatementsList />,
                                        children: [
                                            {
                                                path: `:${RouterParam.statementName}`,
                                                element: <StatementsList />,
                                            },
                                        ],
                                    },
                                    {
                                        path: MobilePath.trades,
                                        element: <StatementsList />,
                                        children: [
                                            {
                                                path: `:${RouterParam.statementName}`,
                                                element: <StatementsList />,
                                            },
                                        ],
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
