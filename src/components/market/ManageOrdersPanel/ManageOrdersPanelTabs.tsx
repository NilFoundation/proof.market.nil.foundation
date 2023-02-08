/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Nav } from '@nilfoundation/react-components';
import { ManageOrdersTab } from './ManageOrdersTab';
import styles from './ManageOrdersPanel.module.scss';

/**
 * Props.
 */
type ManageOrdersPanelTabsProps = {
    currentTab: ManageOrdersTab;
    onSetTab: (t: ManageOrdersTab) => void;
};

/**
 * Manage orders panel tabs.
 *
 * @param {ManageOrdersPanelTabsProps} props Props.
 * @returns React component.
 */
export const ManageOrdersPanelTabs = ({
    currentTab,
    onSetTab,
}: ManageOrdersPanelTabsProps): ReactElement => {
    return (
        <Nav
            justified
            className={styles.nav}
        >
            {Object.values(ManageOrdersTab).map(t => (
                <Nav.Item
                    key={t}
                    onClick={() => onSetTab(t)}
                    active={t === currentTab}
                >
                    {t}
                </Nav.Item>
            ))}
        </Nav>
    );
};
