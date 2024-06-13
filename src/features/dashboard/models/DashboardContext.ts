/**
 * @file Typings.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { DateUnit } from './DateUnit';

/**
 * Dashboard context data model.
 */
export type DashboardContext = {
  /**
   * Display volume series or not.
   */
  displayVolume: boolean;
  /**
   * Date range to group items.
   */
  dateRange: DateUnit;
};
