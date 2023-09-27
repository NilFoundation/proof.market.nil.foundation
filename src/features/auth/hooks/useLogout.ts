/**
 * @file React hook.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { UpdateIsAuthorized, UpdateUserName } from '@/redux';
import { clearAuthLocalStorageState } from '@/utils';

/**
 * Returns callback to logout existed user.
 *
 * @returns Logout callback.
 */
export const useLogout = (): (() => void) => {
  const dispatch = useDispatch();

  const processLogout = useCallback(() => {
    dispatch(UpdateUserName(null));
    dispatch(UpdateIsAuthorized(false));
    clearAuthLocalStorageState();
  }, [dispatch]);

  return processLogout;
};
