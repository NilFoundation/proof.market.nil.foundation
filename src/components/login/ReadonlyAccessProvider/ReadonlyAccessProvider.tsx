/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { login } from '@/api';
import { useAuth, useLogin } from '@/hooks';
import { getRuntimeConfigOrThrow } from '@/utils';

/**
 * Props.
 */
type ReadonlyAccessProviderProps = {
    children?: ReactNode;
    fallback?: ReactNode;
    errorView?: ReactNode;
};

/**
 * Provider automatic auth with readonly user.
 *
 * @param {ReadonlyAccessProviderProps} props Props.
 * @returns React component.
 */
export const ReadonlyAccessProvider = ({
    children,
    fallback,
    errorView,
}: ReadonlyAccessProviderProps): ReactElement => {
    const [error, setError] = useState(false);
    const processLogin = useLogin();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        const readonlyUser = getRuntimeConfigOrThrow().READONLY_USER;

        const loginWithReadonly = async (user: string) => {
            try {
                const { jwt } = await login({
                    username: user,
                    password: '',
                });

                await processLogin(jwt);
            } catch (e) {
                setError(true);
            }
        };

        !isAuthenticated && loginWithReadonly(readonlyUser!);
    }, [processLogin, isAuthenticated]);

    if (error) {
        return <>{errorView}</>;
    }

    return <>{isAuthenticated ? children : fallback ?? null}</>;
};
