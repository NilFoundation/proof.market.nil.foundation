/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Layout as LegacyLayout } from '@nilfoundation/react-components';
import { Outlet } from 'react-router-dom';
import { ReadonlyAccessProvider } from '@/features/auth';
import { FullScreenLoader } from '@/components';

/**
 * Props.
 */
export type LayoutProps = {
  header?: ReactElement;
  footer?: ReactElement;
};

/**
 * Main app layout.
 *
 * @param {LayoutProps} props Props.
 * @returns React element.
 */
const Layout = ({ header, footer }: LayoutProps): ReactElement => {
  return (
    <LegacyLayout
      header={header}
      footer={footer}
      stickyHeader={header !== undefined}
    >
      <ReadonlyAccessProvider fallback={<FullScreenLoader />}>
        <Outlet />
      </ReadonlyAccessProvider>
    </LegacyLayout>
  );
};

export default Layout;
