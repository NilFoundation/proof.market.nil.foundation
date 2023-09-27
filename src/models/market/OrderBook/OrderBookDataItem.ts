/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

/**
 * Order book data item.
 */
export type OrderBookDataItem = {
  ordersAmount: number;
  userOrdersAmount: number;
  cost: number;
  eval_time?: number;
};
