/**
 * @file Layout.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Icon, Nav } from '@nilfoundation/react-components';
import { RouterLink } from '@/components';
import { mobileMenuConfig } from '../../constants/mobileMenuConfig';
import styles from './MobileMenu.module.scss';

/**
 * Mobile menu.
 *
 * @returns React element.
 */
export const MobileMenu = (): ReactElement => {
    return (
        <Nav
            className={styles.menu}
            justified
        >
            {mobileMenuConfig.map(({ title, icon, path }) => (
                <RouterLink
                    key={title}
                    to={path}
                    title={
                        <Icon
                            className={styles.item}
                            iconName={icon}
                        />
                    }
                />
            ))}
        </Nav>
    );
};
