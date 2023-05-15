/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

/**
 * Local storage avialiable keys.
 * Key should exist in LocalStorageKey type to enable autocompletion and typos checking throughover the app.
 */
export type LocalStorageKey =
    | 'authType'
    | 'userToken'
    | 'orderBookPriceStep'
    | 'userBalanceHidden'
    | 'statementDashboardDataRange'
    | 'displayUserOrdersInOrderbook'
    | 'statementDashboardDisplayVolumes'
    | `${string}TableState`
    | 'statementsTags';
