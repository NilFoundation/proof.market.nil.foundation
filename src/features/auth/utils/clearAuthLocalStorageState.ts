/**
 * @file Utility function.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { LocalStorageAPI } from '@/packages/localStorage';

/**
 * Clears localStorage values related to auth state.
 */
export const clearAuthLocalStorageState = () => {
  LocalStorageAPI.removeItem('userToken');
};
