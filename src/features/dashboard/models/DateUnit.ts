/**
 * @file Enum declaration.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { match } from 'ts-pattern';

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
  return match(unit)
    .with(DateUnit.minute, () => 'HH:mm')
    .with(DateUnit.quaterMinute, () => 'HH:mm')
    .with(DateUnit.halfHour, () => 'HH:mm')
    .with(DateUnit.hour, () => 'HH:mm')
    .with(DateUnit.day, () => 'DD.MM')
    .otherwise(() => '');
};
