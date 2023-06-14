/**
 * @file Layout.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Layout } from '@nilfoundation/react-components';
import { Outlet } from 'react-router-dom';
import { Header, Footer, ReadonlyAccessProvider, FullScreenLoader } from '../components';

/**
 * Main app layout.
 *
 * @returns React element.
 */
const MainLayout = (): ReactElement => {
    return (
        <Layout
            header={<Header />}
            footer={<Footer />}
            stickyHeader
        >
            <ReadonlyAccessProvider fallback={<FullScreenLoader />}>
                <Outlet />
            </ReadonlyAccessProvider>
        </Layout>
    );
};

export default MainLayout;
