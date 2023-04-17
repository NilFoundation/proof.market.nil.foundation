/**
 * @file Selectors.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { Proposal } from '@/models';
import type { RootStateType } from '@/redux';

/**
 * Select charts data.
 *
 * @param s State.
 * @returns Chart data.
 */
export const selectChartData = (s: RootStateType): Proposal[] => s.chartsState.data;
