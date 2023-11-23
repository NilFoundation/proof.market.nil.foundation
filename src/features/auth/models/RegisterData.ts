/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

/**
 * Register new user data.
 */
export type RegisterData = {
  /**
   * User name.
   */
  user: string;
  /**
   * Password.
   */
  passwd: string;
  /**
   * Email.
   */
  email?: string;
};
