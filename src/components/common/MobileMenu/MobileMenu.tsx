/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Dropdown } from '@nilfoundation/react-components';
import { documentationUrl, navigationLinks } from '@/constants';
import styles from './MobileMenu.module.scss';

/**
 * Mobile menu.
 *
 * @returns React component.
 */
export const MobileMenu = (): ReactElement => {
    return (
        <Dropdown className={styles.menu}>
            <Dropdown.Button
                className={styles.button}
                iconNameDropdownClosed="fa fa-bars"
                iconNameDropdownOpend="fa fa-times"
            />
            <Dropdown.Menu align="right">
                {navigationLinks.map(({ title, path }) => (
                    <Dropdown.Item
                        href={path}
                        key={title}
                    >
                        {title}
                    </Dropdown.Item>
                ))}
                <Dropdown.Item href={documentationUrl}>Docs</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};
