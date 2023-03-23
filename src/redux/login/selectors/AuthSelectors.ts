/**
 * @file Selectors.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { AuthType } from '@/enums';
import type { RootStateType } from '@/redux';

/**
 * Select current auth type.
 *
 * @param s State.
 * @returns Auth type.
 */
export const selectAuthType = (s: RootStateType): AuthType | undefined => s.authState.type;

/**
 * Select is user authenticated.
 *
 * @param s State.
 * @returns Is authenticated.
 */
export const selectIsAuthenticated = (s: RootStateType): boolean => s.authState.isAuthorized;
