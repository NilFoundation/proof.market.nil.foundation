/**
 * @file Selectors.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { RouterParam } from '@/enums';
import type { RootStateType } from '@/redux';

/**
 * Select location object.
 *
 * @param s State.
 * @returns Location.
 */
export const selectLocation = (s: RootStateType) => s.routerState.location;

/**
 * Creates router param selector.
 *
 * @param routerParam Router param to select.
 * @returns Router param selector.
 */
export const createUrlParamSelector = (routerParam: RouterParam) => (s: RootStateType) =>
    selectUrlParamByKey(s, routerParam);
/**
 * Select param from state.
 *
 * @param s State.
 * @param param Param to select.
 * @returns Param value or undefined.
 */
const selectUrlParamByKey = (s: RootStateType, param: RouterParam) => {
    const params = s.routerState.params;

    return params ? params[param] : undefined;
};
