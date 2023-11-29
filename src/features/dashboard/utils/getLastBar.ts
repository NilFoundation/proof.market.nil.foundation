/**
 * @file Utility function.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { SeriesType } from '@nilfoundation/ui-kit';
import type { ISeriesApi } from 'lightweight-charts';
import { MismatchDirection } from 'lightweight-charts';

/**
 * Get last series data.
 *
 * @param series Series.
 * @returns Last series bar.
 */
export const getLastBar = <T extends SeriesType>(series: ISeriesApi<T>) => {
  return series.dataByIndex(Infinity, MismatchDirection.NearestLeft) ?? undefined;
};
