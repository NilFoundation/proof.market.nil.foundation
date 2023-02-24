/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { siteMoneyTickerAbbreviation } from 'src/constants';
import type { PortfolioOrdersInfo } from '../PortfolioOrdersInfo';

/**
 * Portfolio requests info.
 */
export type PortfolioRequestsInfo = PortfolioOrdersInfo;

/**
 * @param requestsInfo Portfolio requests info.
 * @returns Human readable portfolio requests info.
 */
export const mapToHumanReadablePortfolioRequestsInfo = (requestsInfo: PortfolioRequestsInfo) => ({
    ['Name']: requestsInfo.name,
    ['Overall bids amount']: requestsInfo.amount,
    ['Total sum of all bids costs']: `${requestsInfo.fees} ${siteMoneyTickerAbbreviation}`,
    ['Average generation time']: `${requestsInfo.avg_generation_time?.toFixed(2)} min`,
    ['Average cost']: `${requestsInfo.avg_cost?.toFixed(2)} ${siteMoneyTickerAbbreviation}`,
});
