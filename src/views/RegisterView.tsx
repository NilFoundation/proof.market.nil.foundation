/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Helmet } from 'react-helmet-async';
import { RegisterForm } from '@/components';

/**
 * Register user view.
 *
 * @returns React component.
 */
const RegisterView = (): ReactElement => (
  <>
    <Helmet>
      <title>Register</title>
    </Helmet>
    <RegisterForm />
  </>
);

export default RegisterView;
