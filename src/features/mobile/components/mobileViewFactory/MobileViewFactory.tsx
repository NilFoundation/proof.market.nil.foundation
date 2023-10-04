/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useContext } from 'react';
import { match } from 'ts-pattern';
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

  return match(selectedMenuOption)
    .with(MobileMenuItem.statements, () => <StatementsList />)
    .with(MobileMenuItem.charts, () => <StatementDashboard />)
    .with(MobileMenuItem.trades, () => <TradeHistory />)
    .with(MobileMenuItem.lastProofProducer, () => <LastProofProducer />)
    .otherwise(() => <></>);
};

export default MobileViewFactory;
