/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

/**
 * Statement information.
 */
export type StatementInfo = {
  /**
   * Statement id.
   */
  _key: string;
  /**
   * Current statement cost.
   */
  current: number | null;
  /**
   * Open price.
   */
  open: number | null;
  /**
   * Close (latest) price.
   */
  close: number | null;
  /**
   * Daily change of statement cost. Can be positive or negative.
   */
  daily_change: number;
  /**
   * 24h volume.
   */
  volume: number;
  /**
   * 24h low.
   */
  min: number | null;
  /**
   * 24h hight.
   */
  max: number | null;
};
