/**
 * @file Utility function.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { longDash } from './longDashSymbol';

/**
 * Renders value or long dash symbol if value is empty.
 *
 * @param value Numeric value.
 * @param [fractionDigits] Number of digits after the value decimal point.
 * @returns Value or long dash symbol.
 */
export const renderDashOnEmptyValue = (value?: number | null, fractionDigits = 4): string =>
    value ? value?.toFixed(fractionDigits) : longDash;
