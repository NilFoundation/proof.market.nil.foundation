/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Container, Navbar, Nav } from '@nilfoundation/react-components';
import { documentationUrl, navigationLinks } from '@/constants';
import { MobileMenu } from '../MobileMenu';
import { UserMenu } from '../../login';
import { Breadcrumbs } from '../BreadCrumbs';
import { RouterLink } from '../RouterLink';
import styles from './Header.module.scss';

/**
 * Header.
 *
 * @returns React component.
 */
export const Header = (): ReactElement => {
    return (
        <Navbar className={styles.navbar}>
            <Container
                className={styles.container}
                fluid
            >
                <Breadcrumbs />
                <Nav className={styles.nav}>
                    {navigationLinks.map(({ title, path }) => (
                        <RouterLink
                            key={path}
                            title={title}
                            to={path}
                        />
                    ))}
                    <Nav.Item href={documentationUrl}>Docs</Nav.Item>
                </Nav>
                <UserMenu />
                <MobileMenu />
            </Container>
        </Navbar>
    );
};
