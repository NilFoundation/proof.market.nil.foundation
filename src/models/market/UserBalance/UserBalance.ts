/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

/**
 * User balance.
 */
export interface UserBalance {
  /**
   * User balance.
   */
  balance?: number;
  /**
   * Order status.
   */
  blocked?: number;
  /**
   * Id of accepted Order.
   */
  user: string;
}
