/**
 * @file Layout.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Layout } from '@nilfoundation/react-components';
import { Outlet } from 'react-router-dom';
import { ReadonlyAccessProvider, FullScreenLoader, Header } from '../../../../components';
import { MobileMenu } from '../mobileMenu/MobileMenu';

/**
 * Mobile app layout.
 *
 * @returns React element.
 */
const MobileLayout = (): ReactElement => {
    return (
        <Layout
            header={<Header />}
            footer={<MobileMenu />}
        >
            <ReadonlyAccessProvider fallback={<FullScreenLoader />}>
                <Outlet />
            </ReadonlyAccessProvider>
        </Layout>
    );
};

export default MobileLayout;
