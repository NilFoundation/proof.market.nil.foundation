/**
 * @file Layout.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Layout } from '@nilfoundation/react-components';
import { Outlet } from 'react-router-dom';
import { Footer, Navbar } from '@/features/shared';
import { ReadonlyAccessProvider, FullScreenLoader } from '../components';

/**
 * Main app layout.
 *
 * @returns React element.
 */
const MainLayout = (): ReactElement => {
  return (
    <Layout
      header={<Navbar />}
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
