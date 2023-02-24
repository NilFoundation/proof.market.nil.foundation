/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { siteMoneyTickerAbbreviation } from 'src/constants';

/**
 * User statement info.
 */
export type UserStatementInfo = {
    /**
     * Unique key.
     */
    _key: string;
    /**
     * Statement name.
     */
    name: string;
    /**
     * Overall bids amount.
     */
    amount: string;
    /**
     * Overall costs amount.
     */
    fees: string;
    /**
     * Average generation time.
     */
    avg_generation_time: number | null;
    /**
     * Average cost.
     */
    avg_cost: number | null;
};

/**
 * @param statementInfo User statmeent info.
 * @returns Human readable user statement info.
 */
export const mapToHumanReadableUserStatementInfo = (statementInfo: UserStatementInfo) => ({
    ['Name']: statementInfo.name,
    ['Overall bids amount']: statementInfo.amount,
    ['Total sum of all bids costs']: `${statementInfo.fees} ${siteMoneyTickerAbbreviation}`,
    ['Average generation time']: `${statementInfo.avg_generation_time?.toFixed(2)} min`,
    ['Average cost']: `${statementInfo.avg_cost?.toFixed(2)} ${siteMoneyTickerAbbreviation}`,
});
