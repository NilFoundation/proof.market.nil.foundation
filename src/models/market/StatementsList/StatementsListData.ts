/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

/**
 * Statements list table data.
 */
export type StatementsListData = {
    _key: string;
    name: string;
    cost?: number | null;
    change?: number | null;
    tag?: string;
};
