/**
 * @file Utility function.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import dayjs from 'dayjs';

/**
 * Format UTCTimestamp.
 *
 * @param timestamp - Timestamp.
 * @param format Format.
 * @returns Formatted timestamp string.
 */
export const formatUTCTimestamp = (timestamp: number, format: string): string =>
  dayjs(timestamp * 1000).format(format);
