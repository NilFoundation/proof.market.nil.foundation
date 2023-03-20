/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useContext, useMemo } from 'react';
import { useGetCircuitDashboardData } from '@/hooks';
import colors from '@/styles/export.module.scss';
import { ChartTemplate } from '../ChartTemplate';
import { ChartSettingsContext } from '../CircuitDashboard';

/**
 * Proof cost chart.
 *
 * @returns React component.
 */
export const ProofTimeGenChart = (): ReactElement => {
    const seriesOptions = useMemo(
        () => ({
            color: colors.infoColor,
        }),
        [],
    );
    const { dataRange, displayVolumes } = useContext(ChartSettingsContext);
    const {
        chartData: { proofGenTimeData, volumesData },
        loadingData: isLoadingChartData,
    } = useGetCircuitDashboardData(displayVolumes, dataRange);

    return (
        <ChartTemplate
            loadingData={isLoadingChartData}
            chartName="Proof Generation Time, min"
            seriesData={proofGenTimeData}
            seriesType="Line"
            seriesOptions={seriesOptions}
            volumesData={volumesData}
        />
    );
};
