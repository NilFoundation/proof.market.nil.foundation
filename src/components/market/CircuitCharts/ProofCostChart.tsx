/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useContext, useMemo } from 'react';
import { LineWidth } from 'lightweight-charts';
import { useGetCircuitDashboardData } from 'src/hooks';
import colors from 'src/styles/export.module.scss';
import { ChartTemplate } from '../ChartTemplate';
import { ChartSettingsContext } from '../CircuitDashboard';

/**
 * Proof cost chart.
 *
 * @returns React component.
 */
export const ProofCostChart = (): ReactElement => {
    const seriesOptions = useMemo(
        () => ({
            upColor: colors.successColor,
            downColor: colors.dangerColor,
            priceLineWidth: 2 as LineWidth,
        }),
        [],
    );
    const { dataRange, displayVolumes } = useContext(ChartSettingsContext);
    const {
        chartData: { candlestickChartData, volumesData },
        loadingData: isLoadingChartData,
    } = useGetCircuitDashboardData(displayVolumes, dataRange);

    return (
        <ChartTemplate
            loadingData={isLoadingChartData}
            chartName="Proof cost, USD"
            seriesData={candlestickChartData}
            seriesType="Candlestick"
            seriesOptions={seriesOptions}
            volumesData={volumesData}
        />
    );
};