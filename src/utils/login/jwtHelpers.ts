/**
 * @file Utility function.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import jwt_decode from 'jwt-decode';

/**
 * Parse jwt to get username.
 *
 * @param jwt - Jwt.
 * @throws Will throw an error if can't get user from token.
 * @returns Username or null.
 */
export const getUserFromJwt = (jwt: string): string => {
  const decoded = decodeJwt(jwt);

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
  const decoded = decodeJwt(jwt);

  if (!decoded.exp) {
    throw new Error('Invalid token!');
  }

  return decoded.exp as number;
};

/**
 * Returns decoded jwt token.
 *
 * @param jwt - Jwt.
 * @returns .
 */
const decodeJwt = (jwt: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const decoded: any = jwt_decode(jwt);

  if (!decoded) {
    throw new Error('Invalid token!');
  }

  return decoded;
};
