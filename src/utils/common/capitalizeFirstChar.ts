/**
 * @file Utility function.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

/**
 * Capitalize first char.
 *
 * @param string String.
 * @returns Sitring with capitalized first char.
 */
export const capitalizeFirstChar = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);
