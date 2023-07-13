/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Layout } from '@nilfoundation/react-components';
import { Outlet, useOutletContext } from 'react-router-dom';
import { ReadonlyAccessProvider, FullScreenLoader, Header } from '../../../../components';
import { MobileMenu } from '../mobileMenu/MobileMenu';
import { StatementsList } from '@/features/statementsList';

/**
 * Mobile content factory.
 *
 * @returns React element.
 */
const MobileViewFactory = (): ReactElement => {
    const selectedMenuItem = useOutletContext();

    switch (selectedMenuItem) {
        case 'Statements':
            return <StatementsList />;
        default:
            return <></>;
    }
};

export default MobileViewFactory;
