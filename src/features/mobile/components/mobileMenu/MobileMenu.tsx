/**
 * @file Layout.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Nav } from '@nilfoundation/react-components';
import { mobileMenuConfig } from '../../constants/mobileMenuConfig';
import styles from './MobileMenu.module.scss';

type MobileMenuProps = {
    onSetMenuItem: (item: string) => void;
};

/**
 * Mobile menu.
 *
 * @param {MobileMenuProps} props - Component props.
 * @returns React element.
 */
export const MobileMenu = ({ onSetMenuItem }: MobileMenuProps): ReactElement => {
    return (
        <Nav
            className={styles.menu}
            justified
        >
            {mobileMenuConfig.map(({ key }) => (
                <Nav.Item
                    key={key}
                    onClick={() => onSetMenuItem(key)}
                >
                    {key}
                </Nav.Item>
            ))}
        </Nav>
    );
};
