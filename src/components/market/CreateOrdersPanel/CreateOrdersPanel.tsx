/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useState } from 'react';
import { useAppSelector } from 'src/redux';
import { TradeOrderType } from 'src/models';
import { DashboardCard } from '../../common';
import { ProtectedContent } from '../../login';
import { CreateBidForm } from '../CreateBidForm';
import { CreateOrdersTabs } from './CreateOrdersTabs';
import './CreateOrdersPanel.scss';

/**
 * Create orders panel.
 *
 * @returns React component.
 */
export const CreateOrdersPanel = (): ReactElement => {
    const [tab, setTab] = useState<TradeOrderType>(TradeOrderType.buy);
    const selectedCircuitId = useAppSelector(s => s.circuitsState.selectedid);

    return (
        <DashboardCard>
            <h4>Create orders</h4>
            <div className="cerateOrdersPanel">
                <ProtectedContent overlayTitle="Authorization is required to create orders">
                    <CreateOrdersTabs
                        currentTab={tab}
                        onSetTab={setTab}
                    />
                    {tabFactory(tab, selectedCircuitId)}
                </ProtectedContent>
            </div>
        </DashboardCard>
    );
};

/**
 * Renders tab content conditionally.
 *
 * @param tab Selected tab.
 * @param selectedCircuitId Selected circuit id.
 * @returns React Element.
 */
const tabFactory = (tab: TradeOrderType, selectedCircuitId?: number) => {
    if (selectedCircuitId === undefined) {
        return <h5>Please, select circuit to create orders.</h5>;
    }

    switch (tab) {
        case TradeOrderType.buy:
            return <CreateBidForm />;
        case TradeOrderType.sell:
            return (
                <div className="text-center">
                    If you want generate proofs, please consider to use our{' '}
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href={process.env.REACT_APP_PROOFMARKET_TOOLCHAIN_REPO}
                    >
                        proof-market toolchain repository
                    </a>
                </div>
            );
        default:
            return <></>;
    }
};
