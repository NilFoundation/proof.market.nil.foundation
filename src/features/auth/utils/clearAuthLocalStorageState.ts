/**
 * @file Utility function.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { LocalStorageAPI } from '@/packages/localStorageAdapter';

/**
 * Clears localStorage values related to auth state.
 */
export const clearAuthLocalStorageState = () => {
  LocalStorageAPI.removeItem('userToken');
};
