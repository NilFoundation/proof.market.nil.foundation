/**
 * @file Utility function.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { UTCTimestamp } from 'lightweight-charts';
import type { DateUnit } from '@/enums';
import { floorDateTo } from './floorDateTo';

/**
 * Get UTCTimestamp from date string.
 *
 * @param dateTimestamp - Date.
 * @param floorTo - Date unit floor to.
 * @returns UTCTimestamp.
 */
export const getUTCTimestamp = (dateTimestamp: number, floorTo?: DateUnit): UTCTimestamp => {
    const date = floorTo ? floorDateTo(dateTimestamp, floorTo) : new Date(dateTimestamp);

    return Math.trunc(date.getTime() / 1000) as UTCTimestamp;
};
