/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { siteMoneyTickerAbbreviation } from '@/constants';
import type { PortfolioOrdersInfo } from '../PortfolioOrdersInfo';

/**
 * Portfolio proposals info.
 */
export type PortfolioProposalsInfo = PortfolioOrdersInfo;

/**
 * @param {PortfolioProposalsInfo} proposalsInfo Portfolio proposals info.
 * @returns Human readable portfolio proposals info.
 */
export const mapToHumanReadablePortfolioProposalsInfo = ({
    name,
    amount,
    avg_cost,
    avg_generation_time,
    fees,
}: PortfolioProposalsInfo) => ({
    ['Name']: name,
    ['Overall asks amount']: amount,
    ['Total sum of all asks costs']: fees ? `${fees} ${siteMoneyTickerAbbreviation}` : undefined,
    ['Average generation time']: avg_generation_time
        ? `${avg_generation_time?.toFixed(2)} min`
        : undefined,
    ['Average cost']: avg_cost
        ? `${avg_cost?.toFixed(2)} ${siteMoneyTickerAbbreviation}`
        : undefined,
});
