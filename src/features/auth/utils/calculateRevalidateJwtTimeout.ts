/**
 * @file Utility function.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import dayjs from 'dayjs';
import { getExpiredAtFromJwt } from '@/packages/jwt';

const renewExpiraitionDifference = 0.25 * 60;

/**
 * Returns revalidate jwt timeout in milliseconds.
 *
 * @param jwt Jwt.
 * @throws If token is invalid.
 * @returns Milliseconds.
 */
export const calculateRenewJwtTimeGap = (jwt: string): number => {
  const expiredAt = getExpiredAtFromJwt(jwt);

  return (expiredAt - dayjs().unix() - renewExpiraitionDifference) * 1000;
};
