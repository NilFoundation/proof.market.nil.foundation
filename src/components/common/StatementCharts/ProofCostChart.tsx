/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useMemo } from 'react';
import type { LineWidth } from 'lightweight-charts';
import { useGetStatementDashboardData } from '@/hooks';
import { siteMoneyTickerAbbreviation } from '@/constants';
import colors from '@/styles/export.module.scss';
import { ChartTemplate } from '../ChartTemplate';
import type { ChartBaseProps } from '../ChartTemplate';

/**
 * Props.
 */
type ProofCostChartProps = ChartBaseProps;

/**
 * Proof cost chart.
 *
 * @param {ProofCostChartProps} props Props.
 * @returns React component.
 */
export const ProofCostChart = (props: ProofCostChartProps): ReactElement => {
    const seriesOptions = useMemo(
        () => ({
            upColor: colors.successColor,
            downColor: colors.dangerColor,
            priceLineWidth: 2 as LineWidth,
        }),
        [],
    );
    const {
        chartData: { candlestickChartData, volumesData },
        loadingData: isLoadingChartData,
    } = useGetStatementDashboardData(props.displayVolumes, props.dataRange);

    return (
        <ChartTemplate
            loadingData={isLoadingChartData}
            chartName={`Proof cost, ${siteMoneyTickerAbbreviation}`}
            seriesData={candlestickChartData}
            seriesType="Candlestick"
            seriesOptions={seriesOptions}
            volumesData={volumesData}
            {...props}
        />
    );
};
