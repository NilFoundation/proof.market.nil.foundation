/**
 * @file Utility function.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { JwtDecoder } from '@/packages/jwtDecoder';

/**
 * Parse jwt to get username.
 *
 * @param jwt - Jwt.
 * @throws Will throw an error if can't get user from token.
 * @returns Username or null.
 */
export const getUserFromJwt = (jwt: string): string => {
  const decoded = JwtDecoder.decode(jwt);

  if (!decoded.preferred_username) {
    throw new Error('Invalid token!');
  }

  return decoded.preferred_username as string;
};

/**
 * Parse jwt to get expired at time.
 *
 * @param jwt - Jwt.
 * @throws Will throw an error if can't get expired at from token.
 * @returns Expired at.
 */
export const getExpiredAtFromJwt = (jwt: string): number => {
  const decoded = JwtDecoder.decode(jwt);

  if (!decoded.exp) {
    throw new Error('Invalid token!');
  }

  return decoded.exp as number;
};
