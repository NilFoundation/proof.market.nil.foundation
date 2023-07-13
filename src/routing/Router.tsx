/**
 * @file React routing.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { useRoutes } from 'react-router-dom';
import { routesConfig } from './routesConfig';

/**
 * Returns React element you can use to render the route tree.
 *
 * @returns Routes.
 */
export const Router = (): ReturnType<typeof useRoutes> => {
    const routes = useRoutes(routesConfig);

    return routes;
};
