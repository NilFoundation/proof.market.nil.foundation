/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import loadable from '@loadable/component';
import { Button, Dropdown, Icon, Menu, Spinner } from '@nilfoundation/react-components';
import { useNavigate } from 'react-router-dom';
import { useAuth, useLogout } from '@/hooks';
import { Path } from '@/routing';
import styles from './UserMenu.module.scss';

const UserBalance = loadable(() => import('../UserBalance/UserBalance'), {
    fallback: <Spinner grow />,
});

/**
 * User menu.
 *
 * @returns React component.
 */
export const UserMenu = (): ReactElement => {
    const { user, isReadonly } = useAuth();
    const processLogout = useLogout();
    const navigate = useNavigate();

    if (!user || isReadonly) {
        return (
            <Button
                className={styles.button}
                onClick={() => navigate(Path.login)}
            >
                <Icon
                    iconName="fa-solid fa-circle-user"
                    className={styles.icon}
                />
                Sign In
            </Button>
        );
    }

    return (
        <div className={styles.menu}>
            <Dropdown className={styles.dropdown}>
                <Dropdown.Button className={styles.button}>
                    <Icon
                        iconName="fa-solid fa-circle-user"
                        className={styles.icon}
                    />
                    {user}
                </Dropdown.Button>
                <Dropdown.Menu align="right">
                    <Menu.Header className={styles.balanceContainer}>
                        <div className={styles.balanceTitle}>Current balance:</div>
                        <UserBalance className={styles.balance} />
                    </Menu.Header>
                    <Menu.Divider />
                    <Dropdown.Item onSelect={processLogout}>
                        <Icon
                            iconName="fa-solid fa-power-off"
                            className={styles.icon}
                        />
                        Logout
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};
