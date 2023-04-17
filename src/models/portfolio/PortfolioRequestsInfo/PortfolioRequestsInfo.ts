/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { siteMoneyTickerAbbreviation } from '@/constants';
import type { PortfolioOrdersInfo } from '../PortfolioOrdersInfo';

/**
 * Portfolio requests info.
 */
export type PortfolioRequestsInfo = PortfolioOrdersInfo;

/**
 * @param {PortfolioRequestsInfo} requestsInfo Portfolio requests info.
 * @returns Human readable portfolio requests info.
 */
export const mapToHumanReadablePortfolioRequestsInfo = ({
    name,
    amount,
    avg_cost,
    avg_generation_time,
    fees,
}: PortfolioRequestsInfo) => ({
    ['Name']: name,
    ['Overall requests amount']: amount,
    ['Total sum of all requests costs']: fees
        ? `${fees} ${siteMoneyTickerAbbreviation}`
        : undefined,
    ['Average generation time']: avg_generation_time
        ? `${avg_generation_time?.toFixed(2)} min`
        : undefined,
    ['Average cost']: avg_cost
        ? `${avg_cost?.toFixed(2)} ${siteMoneyTickerAbbreviation}`
        : undefined,
});
