/**
 * @file React hook.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { useMemo } from 'react';
import { selectIsAuthorized, selectUserName, useAppSelector } from '@/redux';
import { getRuntimeConfigOrThrow } from '@/utils';

const readonlyUser = getRuntimeConfigOrThrow().READONLY_USER;

/**
 * Provides access to auth state.
 *
 * @returns Auth state.
 */
export const useAuth = () => {
  const user = useAppSelector(selectUserName);
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const isReadonly = useMemo(() => {
    return user === readonlyUser;
  }, [user]);

  return {
    user,
    isAuthorized,
    isReadonly,
  };
};
