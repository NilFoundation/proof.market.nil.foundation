/**
 * @file Utility function.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

/**
 * Drops all nullable values from array in a type safe manner.
 *
 * @param value Any value.
 * @returns True if value is not nullable.
 */
export const notEmpty = <T>(value: T): value is NonNullable<T> => {
    return value !== null && value !== undefined;
};
