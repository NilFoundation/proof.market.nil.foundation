/**
 * @file Layout.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useState } from 'react';
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
    const [selectedMenuOption, setSeleectedMenuOption] = useState<string>();

    return (
        <Layout
            header={<Header />}
            footer={<MobileMenu onSetMenuItem={setSeleectedMenuOption} />}
        >
            <ReadonlyAccessProvider fallback={<FullScreenLoader />}>
                <Outlet context={selectedMenuOption} />
            </ReadonlyAccessProvider>
        </Layout>
    );
};

export default MobileLayout;
