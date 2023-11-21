/**
 * @file Index.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import jwt_decode from 'jwt-decode';

/**
 * Decodes jwt.
 */
export class JwtDecoder {
  /**
   * Decodes jwt.
   *
   * @param jwt - Jwt.
   * @throws Will throw an error if can't get user from token.
   * @returns Decoded jwt.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static decode<T = any>(jwt: string): T {
    const decoded: T = jwt_decode(jwt);

    if (!decoded) {
      throw new Error('Invalid token!');
    }

    return decoded;
  }
}
