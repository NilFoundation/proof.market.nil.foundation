/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { AuthContainer, LoginForm } from '../components';

/**
 * Login view.
 *
 * @returns React component.
 */
const LoginView = (): ReactElement => (
    <AuthContainer>
        <LoginForm />
    </AuthContainer>
);

export default LoginView;
