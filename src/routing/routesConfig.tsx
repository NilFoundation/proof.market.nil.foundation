/**
 * @file React routing.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { RouterParam } from 'src/enums';
import ProtectedRoute from 'src/components/login/ProtectedRoute/ProtectedRoute';
import RouterReduxConnector from 'src/components/common/RouterReduxConnector/RouterReduxConnector';
import ProofContentCard from 'src/components/portfolio/ProofContentCard/ProofContentCard';
import { Path } from './Paths';
import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../layouts/MainLayout';

const MarketView = lazy(() => import(/* webpackChunkName: "MarketView" */ '../views/MarketView'));
const LoginView = lazy(() => import(/* webpackChunkName: "LoginView" */ '../views/LoginView'));
const PortfolioView = lazy(
    () => import(/* webpackChunkName: "PortfolioView" */ '../views/PortfolioView'),
);
const Page404 = lazy(() => import(/* webpackChunkName: "Page404" */ '../views/404'));
const RegisterView = lazy(
    () => import(/* webpackChunkName: "RegisterView" */ '../views/RegisterView'),
);

/**
 * App routes.
 */
export const routesConfig: RouteObject[] = [
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
                element: <AuthLayout />,
                children: [
                    {
                        path: Path.login,
                        element: <LoginView />,
                    },
                    {
                        path: Path.register,
                        element: <RegisterView />,
                    },
                ],
            },
            {
                element: <MainLayout />,
                children: [
                    {
                        element: <ProtectedRoute readonlyAccess />,
                        children: [
                            {
                                path: Path.market,
                                element: <MarketView />,
                                children: [
                                    {
                                        path: `:${RouterParam.statementName}`,
                                        element: <MarketView />,
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        element: <ProtectedRoute />,
                        children: [
                            {
                                path: Path.proofs,
                                element: <ProofContentCard />,
                                children: [
                                    {
                                        path: `:${RouterParam.proofKey}`,
                                        element: <ProofContentCard />,
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        path: Path.any, // This should always be the last
                        element: <Page404 />,
                    },
                ],
            },
        ],
    },
];
