/**
 * @file Utility function.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import dayjs from 'dayjs';

/**
 * Check if date is previous day.
 *
 * @param first - First date string.
 * @param second - Second date string.
 * @returns True if second date is previous day for the first date.
 */
export const isPreviousDay = (first: string, second: string): boolean => {
    const firstDate = dayjs(first);
    const secondDate = dayjs(second);

    return firstDate.get('day') !== secondDate.get('day') && firstDate > secondDate;
};
