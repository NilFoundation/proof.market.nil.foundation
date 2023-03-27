/**
 * @file App.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Layout } from '@nilfoundation/react-components';
import { Outlet } from 'react-router-dom';

/**
 * Charts layout.
 *
 * @returns React element.
 */
const ChartsLayout = (): ReactElement => {
    return (
        <Layout>
            <Outlet />
        </Layout>
    );
};

export default ChartsLayout;
