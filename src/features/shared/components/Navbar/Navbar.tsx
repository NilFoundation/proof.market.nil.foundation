/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Brand, NavigationBar } from '@nilfoundation/ui-kit';
import { useAuth } from '@/features/auth';
import { navbarConfig } from './navbarConfig';

/**
 * Navbar.
 *
 * @returns React component.
 */
export const Navbar = (): ReactElement => {
    const { user, isAuthorized, isReadonly } = useAuth();

    return (
        <NavigationBar
            items={navbarConfig}
            username={user ?? undefined}
            isAuth={isAuthorized && !isReadonly}
            brand={<Brand />}
        />
    );
};
