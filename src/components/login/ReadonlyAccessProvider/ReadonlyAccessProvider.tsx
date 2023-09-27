/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { login } from '@/api';
import { useAuth, useLogin } from '@/features/auth';
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
  const { isAuthorized } = useAuth();

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

    !isAuthorized && loginWithReadonly(readonlyUser!);
  }, [processLogin, isAuthorized]);

  if (error) {
    return <>{errorView}</>;
  }

  return <>{isAuthorized ? children : fallback ?? null}</>;
};
