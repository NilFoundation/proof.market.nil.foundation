/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { RouteObject } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';

/**
 * Props.
 */
type RouterProps = {
    config: RouteObject[];
};

/**
 * Returns React element you can use to render the route tree.
 *
 * @param {RouterProps} props Props.
 * @returns Routes.
 */
export const Router = ({ config }: RouterProps): ReturnType<typeof useRoutes> => {
    const routes = useRoutes(config);

    return routes;
};
