/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useContext } from 'react';
import { Nav } from '@nilfoundation/react-components';
import { TradeOrderType } from '@/models';
import { OrderManagementContext } from '../OrderManagementContextProvider';

/**
 * Props.
 */
type OrderManagementTabsProps = {
    currentTab: TradeOrderType;
    onSetTab: (t: TradeOrderType) => void;
};

/**
 * Order management panel.
 *
 * @param {OrderManagementTabsProps} props Props.
 * @returns React component.
 */
export const CreateOrdersTabs = ({
    currentTab,
    onSetTab,
}: OrderManagementTabsProps): ReactElement => {
    const { processing } = useContext(OrderManagementContext);

    return (
        <Nav justified>
            {Object.values(TradeOrderType).map(t => (
                <Nav.Item
                    key={t}
                    onClick={() => onSetTab(t)}
                    active={t === currentTab}
                    disabled={processing}
                >
                    {t}
                </Nav.Item>
            ))}
        </Nav>
    );
};
