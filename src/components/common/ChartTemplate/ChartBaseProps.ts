/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { DateUnit } from '@/enums';

/**
 * Base chart props.
 */
export type ChartBaseProps = {
  dataRange: DateUnit;
  displayVolumes: boolean;
  height: number;
};
