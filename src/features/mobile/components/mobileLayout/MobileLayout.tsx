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
import type { MobileOutletContext } from '../../models/MobileOutletContext';
import { MobileMenuItem } from '../../enums/MobileMenuItem';

/**
 * Mobile app layout.
 *
 * @returns React element.
 */
const MobileLayout = (): ReactElement => {
    const [selectedMenuOption, setSeleectedMenuOption] = useState<MobileMenuItem>(
        MobileMenuItem.statements,
    );

    return (
        <Layout
            header={<Header />}
            footer={
                <MobileMenu
                    selectedMenuOption={selectedMenuOption}
                    onSetMenuOption={setSeleectedMenuOption}
                />
            }
        >
            <ReadonlyAccessProvider fallback={<FullScreenLoader />}>
                <Outlet context={{ selectedMenuOption } satisfies MobileOutletContext} />
            </ReadonlyAccessProvider>
        </Layout>
    );
};

export default MobileLayout;
