/**
 * @file Enum declaration.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

/**
 * Date range variant.
 */
export enum DateUnit {
    minute = '1m',
    quaterMinute = '15m',
    halfHour = '30m',
    hour = '1h',
    day = 'D',
}

/**
 * Returns time scale date format based on provided date unit.
 *
 * @param unit Date unit.
 * @returns Date format.
 */
export const getDateFormatBasedOnDateUnit = (unit: DateUnit): string => {
    switch (unit) {
        case DateUnit.minute:
        case DateUnit.quaterMinute:
        case DateUnit.halfHour:
        case DateUnit.hour:
            return 'DD.MM HH:mm';
        case DateUnit.day:
            return 'DD.MM';
        default:
            return '';
    }
};
