/**
 * @file Selectors.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { RootStateType } from '@/redux';

/**
 * Select is user authenticated.
 *
 * @param s State.
 * @returns Is authenticated.
 */
export const selectIsAuthorized = (s: RootStateType): boolean => s.authState.isAuthorized;
