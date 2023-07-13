/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { Column } from 'react-table';
import type { OrderBookDataItem } from './OrderBookDataItem';

/**
 * Table column data.
 */
export type OrderBookTableColumn = Column<OrderBookDataItem>;
