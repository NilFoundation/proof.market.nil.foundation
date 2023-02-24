/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { siteMoneyTickerAbbreviation } from 'src/constants';
import type { PortfolioOrdersInfo } from '../PortfolioOrdersInfo';

/**
 * Portfolio proposals info.
 */
export type PortfolioProposalsInfo = PortfolioOrdersInfo;

/**
 * @param proposalsInfo Portfolio proposals info.
 * @returns Human readable portfolio proposals info.
 */
export const mapToHumanReadablePortfolioProposalsInfo = (
    proposalsInfo: PortfolioProposalsInfo,
) => ({
    ['Name']: proposalsInfo.name,
    ['Overall asks amount']: proposalsInfo.amount,
    ['Total sum of all asks costs']: `${proposalsInfo.fees} ${siteMoneyTickerAbbreviation}`,
    ['Average generation time']: `${proposalsInfo.avg_generation_time?.toFixed(2)} min`,
    ['Average cost']: `${proposalsInfo.avg_cost?.toFixed(2)} ${siteMoneyTickerAbbreviation}`,
});
