/**
 * @file Utility function.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { DateUnit } from '@/enums';

/**
 * Round date string to provided time value. Always rounds down.
 *
 * @param dateString Date string.
 * @param floorTo Round date to.
 * @returns Date.
 */
export const floorDateTo = (dateString: string, floorTo: DateUnit): Date => {
    const date = new Date(dateString);

    switch (floorTo) {
        case DateUnit.minute:
            date.setSeconds(0, 0);
            break;
        case DateUnit.quaterMinute:
            floorToQuaterMinute(date);
            break;
        case DateUnit.halfHour:
            date.setMinutes(date.getMinutes() >= 30 ? 30 : 0, 0, 0);
            break;
        case DateUnit.hour:
            date.setMinutes(0, 0, 0);
            break;
        case DateUnit.day:
            date.setHours(0, 0, 0, 0);
            break;
    }

    return date;
};

const floorToQuaterMinute = (date: Date): void => {
    const minutes = date.getMinutes();
    let minutesToSet = 0;

    if (minutes >= 15 && minutes < 30) {
        minutesToSet = 15;
    }

    if (minutes >= 30 && minutes < 45) {
        minutesToSet = 30;
    }

    if (minutes >= 45) {
        minutesToSet = 45;
    }

    date.setMinutes(minutesToSet, 0, 0);
};
