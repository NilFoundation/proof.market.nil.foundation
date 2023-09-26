/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { AuthDropdownContainer, Brand, NavigationBar } from '@nilfoundation/ui-kit';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth, useLogout } from '@/features/auth';
import { Path } from '@/features/routing';
import { navbarConfig } from './navbarConfig';

/**
 * Navbar.
 *
 * @returns React component.
 */
export const Navbar = (): ReactElement => {
    const { user, isAuthorized, isReadonly } = useAuth();
    const processLogout = useLogout();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    return (
        <NavigationBar
            items={navbarConfig}
            username={user ?? undefined}
            isAuth={isAuthorized && !isReadonly}
            brand={<Brand />}
            onLogin={() => navigate(Path.login, { replace: true, state: { from: pathname } })}
            authDropdownContainer={
                <AuthDropdownContainer
                    username={user ?? undefined}
                    onLogout={processLogout}
                />
            }
        />
    );
};
