/**
 * @file Selectors.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { GoogleUserinfo, UserBalance } from '@/models';
import type { RootStateType } from '@/redux';

/**
 * Select current user name.
 *
 * @param s State.
 * @returns User name.
 */
export const selectUserName = (s: RootStateType): string | null => s.userState.name;

/**
 * Select current user balance.
 *
 * @param s State.
 * @returns User balance.
 */
export const selectUserBalance = (s: RootStateType): UserBalance | undefined => s.userState.balance;

/**
 * Select google user info.
 *
 * @param s State.
 * @returns Google user info.
 */
export const selectGoogleUserInfo = (s: RootStateType): GoogleUserinfo | undefined =>
    s.userState.googleUserInfo;
