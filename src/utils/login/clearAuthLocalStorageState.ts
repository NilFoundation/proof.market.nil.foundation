/**
 * @file Utility function.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { removeItemFromLocalStorage } from '@/packages/LocalStorage';

/**
 * Clears localStorage values related to auth state.
 */
export const clearAuthLocalStorageState = () => {
    removeItemFromLocalStorage('userToken');
    removeItemFromLocalStorage('authType');
};
