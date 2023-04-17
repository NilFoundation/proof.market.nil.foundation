/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { useGetStatementDashboardData } from '@/hooks';
import colors from '@/styles/export.module.scss';
import { ChartTemplate } from '../ChartTemplate';
import type { ChartBaseProps } from '../ChartTemplate';

/**
 * Props.
 */
type ProofTimeGenChartProps = ChartBaseProps;

/**
 * Proof cost chart.
 *
 * @param {ProofTimeGenChartProps} props Props.
 * @returns React component.
 */
export const ProofTimeGenChart = (props: ProofTimeGenChartProps): ReactElement => {
    const seriesOptions = useMemo(
        () => ({
            color: colors.infoColor,
        }),
        [],
    );
    const {
        chartData: { proofGenTimeData, volumesData },
        loadingData: isLoadingChartData,
    } = useGetStatementDashboardData(props.displayVolumes, props.dataRange);

    return (
        <ChartTemplate
            loadingData={isLoadingChartData}
            chartName="Proof Generation Time, min"
            seriesData={proofGenTimeData}
            seriesType="Line"
            seriesOptions={seriesOptions}
            volumesData={volumesData}
            {...props}
        />
    );
};
