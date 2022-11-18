/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Container, Navbar, Nav } from '@nilfoundation/react-components';
import { Link, useLocation } from 'react-router-dom';
import { navigationLinks } from 'src/constants';
import { MobileMenu } from '../MobileMenu';
import { UserMenu } from '../UserMenu';
import { Breadcrumbs } from '../BreadCrumbs';
import './Header.scss';
import { Path } from 'src/routing';

/**
 * Header.
 *
 * @returns React component.
 */
export const Header = (): ReactElement => {
    const { pathname } = useLocation();

    return (
        <Navbar>
            <Container
                className="headerContainer"
                fluid
            >
                <Breadcrumbs />
                <Nav>
                    {navigationLinks.map(({ title, path }) => (
                        <Nav.Item
                            key={title}
                            active={pathname === path}
                            disabled={path === Path.proofGenerators}
                            renderLink={({ active: _, ...props }) => (
                                <Link
                                    to={path}
                                    {...props}
                                >
                                    <span>{title}</span>
                                </Link>
                            )}
                        />
                    ))}
                </Nav>
                <UserMenu />
                <MobileMenu />
            </Container>
        </Navbar>
    );
};
