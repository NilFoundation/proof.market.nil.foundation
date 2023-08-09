/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useContext } from 'react';
import { StatementsList } from '@/features/statementsList';
import { StatementDashboard, TradeHistory, LastProofProducer } from '@/components';
import { MobileMenuItem } from '../../enums/MobileMenuItem';
import { MobileMenuContext } from '../mobileLayout/MobileMenuContext';

/**
 * Mobile content factory.
 *
 * @returns React element.
 */
const MobileViewFactory = (): ReactElement => {
    const { selectedMenuOption } = useContext(MobileMenuContext);

    switch (selectedMenuOption) {
        case MobileMenuItem.statements:
            return <StatementsList />;
        case MobileMenuItem.charts:
            return <StatementDashboard />;
        case MobileMenuItem.trades:
            return <TradeHistory />;
        case MobileMenuItem.lastProofProducer:
            return <LastProofProducer />;
        default:
            return <></>;
    }
};

export default MobileViewFactory;
