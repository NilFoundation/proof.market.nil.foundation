/**
 * @file Layout.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContainer } from '@/components';

/**
 * Auth layout.
 *
 * @returns React element.
 */
const AuthLayout = (): ReactElement => {
  return (
    <AuthContainer>
      <Outlet />
    </AuthContainer>
  );
};

export default AuthLayout;
