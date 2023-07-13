/**
 * @file Utility function.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import dayjs from 'dayjs';

/**
 * Formats date string.
 *
 * @param date - Date string.
 * @param format - Format.
 * @returns Formatted date string representation.
 */
export const formatDate = (date: string | number, format: string): string =>
    dayjs(date).format(format);
