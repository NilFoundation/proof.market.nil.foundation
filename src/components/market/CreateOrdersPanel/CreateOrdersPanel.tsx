/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useState } from 'react';
import { useAppSelector } from '@/redux';
import { TradeOrderType } from '@/models';
import { socialLinks as links } from '@/constants';
import { getRuntimeConfigOrThrow } from '@/utils';
import { DashboardCard, SocialLinks } from '../../common';
import { ProtectedContent } from '../../login';
import { CreateBidForm } from '../CreateBidForm';
import { CreateOrdersTabs } from './CreateOrdersTabs';
import './CreateOrdersPanel.scss';

const socialLinks = links.filter(({ icon }) => ['discord', 'telegram'].includes(icon));

/**
 * Create orders panel.
 *
 * @returns React component.
 */
export const CreateOrdersPanel = (): ReactElement => {
    const [tab, setTab] = useState<TradeOrderType>(TradeOrderType.buy);
    const selectedCircuitKey = useAppSelector(s => s.circuitsState.selectedKey);

    return (
        <DashboardCard>
            <h4>Create orders</h4>
            <div className="cerateOrdersPanel">
                <ProtectedContent overlayTitle="Authorization is required to create orders">
                    <CreateOrdersTabs
                        currentTab={tab}
                        onSetTab={setTab}
                    />
                    {tabFactory(tab, selectedCircuitKey)}
                </ProtectedContent>
            </div>
        </DashboardCard>
    );
};

/**
 * Renders tab content conditionally.
 *
 * @param tab Selected tab.
 * @param selectedCircuitKey Selected circuit key.
 * @returns React Element.
 */
const tabFactory = (tab: TradeOrderType, selectedCircuitKey?: string) => {
    if (selectedCircuitKey === undefined) {
        return <h5>Please, select circuit to create orders.</h5>;
    }

    switch (tab) {
        case TradeOrderType.buy:
            return <CreateBidForm />;
        case TradeOrderType.sell:
            return (
                <div className="text-center">
                    If you wish to generate proofs, please see instructions on our{' '}
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href={getRuntimeConfigOrThrow().PROOFMARKET_TOOLCHAIN_REPO}
                    >
                        <strong>toolchain repository</strong>
                    </a>
                    <p></p>
                    <div>
                        or join us on Discord or Telegram:
                        <SocialLinks socialLinks={socialLinks} />
                    </div>
                </div>
            );
        default:
            return <></>;
    }
};
