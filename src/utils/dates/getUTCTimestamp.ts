/**
 * @file Utility function.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { UTCTimestamp } from 'lightweight-charts';
import type { DateUnit } from '@/enums';
import { floorDateTo } from './floorDateTo';

/**
 * Get UTCTimestamp from date string.
 *
 * @param dateString - Date string.
 * @param floorTo - Date unit floor to.
 * @returns UTCTimestamp.
 */
export const getUTCTimestamp = (dateString: string, floorTo?: DateUnit): UTCTimestamp => {
    const date = floorTo ? floorDateTo(dateString, floorTo) : new Date(dateString);

    return Math.trunc(date.getTime() / 1000) as UTCTimestamp;
};
