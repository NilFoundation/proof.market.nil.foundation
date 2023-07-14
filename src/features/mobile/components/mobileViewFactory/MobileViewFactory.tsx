/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useOutletContext } from 'react-router-dom';
import { StatementsList } from '@/features/statementsList';
import type { MobileOutletContext } from '../../models/MobileOutletContext';
import { MobileMenuItem } from '../../enums/MobileMenuItem';

/**
 * Mobile content factory.
 *
 * @returns React element.
 */
const MobileViewFactory = (): ReactElement => {
    const { selectedMenuOption } = useOutletContext<MobileOutletContext>();

    switch (selectedMenuOption) {
        case MobileMenuItem.statements:
            return <StatementsList />;
        default:
            return <></>;
    }
};

export default MobileViewFactory;
