/**
 * @file Utility type.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

/**
 * Returns values of provided type.
 */
export type ValueOf<T> = T[keyof T];
