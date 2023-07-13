/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Container, Navbar, Nav } from '@nilfoundation/react-components';
import { documentationUrl, navigationLinks } from '@/constants';
import { useWindowDimensions } from '@/features/shared';
import { MobileMenu } from '../MobileMenu';
import { UserMenu } from '../../login';
import { Breadcrumbs } from '../BreadCrumbs';
import { RouterLink } from '../RouterLink';
import styles from './Header.module.scss';
import clsx from 'clsx';

/**
 * Header.
 *
 * @returns React component.
 */
export const Header = (): ReactElement => {
    const { width } = useWindowDimensions();
    const isMobile = width < 600;

    return (
        <Navbar className={styles.navbar}>
            <Container
                className={styles.container}
                fluid
            >
                <Breadcrumbs />
                <Nav className={clsx(styles.nav, styles.desktopOnly)}>
                    {navigationLinks.map(({ title, path }) => (
                        <RouterLink
                            key={path}
                            title={title}
                            to={path}
                        />
                    ))}
                    <Nav.Item href={documentationUrl}>Docs</Nav.Item>
                </Nav>
                {isMobile ? (
                    <Nav className={styles.nav}>
                        <Nav.Item href={documentationUrl}>Docs</Nav.Item>
                    </Nav>
                ) : (
                    <>
                        <UserMenu />
                        <MobileMenu />
                    </>
                )}
            </Container>
        </Navbar>
    );
};
