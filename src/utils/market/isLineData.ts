/**
 * @file Utility function.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { BarData, LineData } from 'lightweight-charts';

/**
 * @param data Chart data.
 * @returns True if value is {@link LineData}.
 */
export const isLineData = (data: LineData | BarData): data is LineData => {
    return (data as LineData)?.value !== undefined;
};
