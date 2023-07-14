/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Nav } from '@nilfoundation/react-components';
import { mobileMenuConfig } from '../../constants/mobileMenuConfig';
import type { MobileMenuItem } from '../../enums/MobileMenuItem';
import styles from './MobileMenu.module.scss';

type MobileMenuProps = {
    selectedMenuOption?: MobileMenuItem;
    onSetMenuOption: (item: MobileMenuItem) => void;
};

/**
 * Mobile menu.
 *
 * @param {MobileMenuProps} props - Component props.
 * @returns React element.
 */
export const MobileMenu = ({
    selectedMenuOption,
    onSetMenuOption,
}: MobileMenuProps): ReactElement => {
    return (
        <Nav
            className={styles.menu}
            justified
        >
            {mobileMenuConfig.map(({ key }) => (
                <Nav.Item
                    key={key}
                    active={selectedMenuOption === key}
                    onClick={() => onSetMenuOption(key)}
                >
                    {key}
                </Nav.Item>
            ))}
        </Nav>
    );
};
