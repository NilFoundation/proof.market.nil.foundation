/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useState } from 'react';
import { Spinner } from '@nilfoundation/react-components';
import { useAppSelector } from 'src/redux';
import { useGetManageOrdersData } from 'src/hooks';
import type { ManageOrdersData } from 'src/models';
import { DashboardCard } from '../../common';
import { ProtectedContent } from '../../login';
import { ManageOrdersTab } from './ManageOrdersTab';
import { ManageOrdersPanelTabs } from './ManageOrdersPanelTabs';
import { ActiveOrdersTable } from '../ActiveOrdersPanel';
import { HistoryOrdersTable } from './HistoryOrdersTable';
import styles from './ManageOrdersPanel.module.scss';

/**
 * Manage orders panel.
 *
 * @returns React component.
 */
export const ManageOrdersPanel = (): ReactElement => {
    const [tab, setTab] = useState<ManageOrdersTab>(ManageOrdersTab.active);
    const selectedCircuitKey = useAppSelector(s => s.circuitsState.selectedKey);
    const { isError, loadingData, activeOrdersData, historyOrdersData } = useGetManageOrdersData();

    return (
        <DashboardCard>
            <h4>Manage orders</h4>
            <div
                className={styles.manageOrdersPanel}
                data-sb="manageOrdersPanel"
            >
                <ProtectedContent overlayTitle="Authorization is required to manage orders">
                    <ManageOrdersPanelTabs
                        currentTab={tab}
                        onSetTab={setTab}
                    />
                    {selectedCircuitKey !== undefined ? (
                        viewFactory(
                            tab,
                            isError,
                            loadingData,
                            tab === ManageOrdersTab.active ? activeOrdersData : historyOrdersData,
                        )
                    ) : (
                        <h5>Please, select circuit to display orders.</h5>
                    )}
                </ProtectedContent>
            </div>
        </DashboardCard>
    );
};

/**
 * Renders content conditionally.
 *
 * @param tab - Tab.
 * @param error - Error.
 * @param loading - Loading.
 * @param data - Data.
 * @returns React Element.
 */
const viewFactory = (
    tab: ManageOrdersTab,
    error: boolean,
    loading: boolean,
    data: ManageOrdersData[],
) => {
    if (error) {
        return <h5>Error while loading data.</h5>;
    }

    if (data.length === 0) {
        return loading ? <Spinner grow /> : <h5>No orders.</h5>;
    }

    switch (tab) {
        case ManageOrdersTab.active:
            return <ActiveOrdersTable data={data} />;
        case ManageOrdersTab.history:
            return <HistoryOrdersTable data={data} />;
        default:
            return <></>;
    }
};
