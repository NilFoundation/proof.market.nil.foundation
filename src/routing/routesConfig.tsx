/**
 * @file React routing.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { RouterParam } from '@/enums';
import ProtectedRoute from '@/components/login/ProtectedRoute/ProtectedRoute';
import RouterReduxConnector from '@/components/common/RouterReduxConnector/RouterReduxConnector';
import RequestsContent from '@/components/portfolio/PortfolioRequestsInfoContent/PortfolioRequestsInfoContent';
import UserStatementInfoContent from '@/components/portfolio/UserStatementInfoContent/UserStatementInfoContent';
import ProposalContent from '@/components/portfolio/PortfolioProposalsInfoContent/PortfolioProposalsInfoContent';
import ChartsLayout from '@/layouts/ChartsLayout';
import AuthLayout from '@/layouts/AuthLayout';
import MainLayout from '@/layouts/MainLayout';
import { Path } from './Paths';

const MarketView = lazy(() => import(/* webpackChunkName: "MarketView" */ '../views/MarketView'));
const LoginView = lazy(() => import(/* webpackChunkName: "LoginView" */ '../views/LoginView'));
const PortfolioView = lazy(
    () => import(/* webpackChunkName: "PortfolioView" */ '../views/PortfolioView'),
);
const Page404 = lazy(() => import(/* webpackChunkName: "Page404" */ '../views/404'));
const RegisterView = lazy(
    () => import(/* webpackChunkName: "RegisterView" */ '../views/RegisterView'),
);
const ChartsView = lazy(() => import(/* webpackChunkName: "ChartsView" */ '../views/ChartsView'));

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
                                path: Path.portfolio,
                                element: <PortfolioView />,
                                children: [
                                    {
                                        index: true,
                                        element: (
                                            <Navigate
                                                to={Path.requests}
                                                replace
                                            />
                                        ),
                                    },
                                    {
                                        path: `${Path.requests}`,
                                        element: <RequestsContent />,
                                        children: [
                                            {
                                                path: `:${RouterParam.portfolioRequestsInfoStatementName}`,
                                                element: <RequestsContent />,
                                            },
                                        ],
                                    },
                                    {
                                        path: `${Path.proposals}`,
                                        element: <ProposalContent />,
                                        children: [
                                            {
                                                path: `:${RouterParam.portfolioProposalsInfoStatementName}`,
                                                element: <ProposalContent />,
                                            },
                                        ],
                                    },
                                    {
                                        path: Path.statements,
                                        element: <UserStatementInfoContent />,
                                        children: [
                                            {
                                                path: `:${RouterParam.portfolioUserStatementsInfoName}`,
                                                element: <UserStatementInfoContent />,
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
            {
                element: <ChartsLayout />,
                children: [
                    {
                        path: Path.charts,
                        element: <ChartsView />,
                        children: [
                            {
                                path: `:${RouterParam.statementName}/:${RouterParam.chartType}`,
                                element: <ChartsView />,
                            },
                        ],
                    },
                ],
            },
        ],
    },
];
