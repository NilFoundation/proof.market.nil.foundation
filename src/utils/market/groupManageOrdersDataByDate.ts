/**
 * @file Utility function.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ManageOrdersData } from 'src/models';
import { formatDate } from '../dates';

/**
 * @param data Manage orders data.
 * @returns Data groupped by date.
 */
export const groupManageOrdersDataByDate = (data: ManageOrdersData[]) => {
  return data.reduce((groups, dataItem) => {
    const key = formatDate(dataItem.init_time, 'DD.MM.YYYY');
    if (!groups[key]) groups[key] = [];
    groups[key].push(dataItem);

    return groups;
  }, {} as Record<string, ManageOrdersData[]>);
};
