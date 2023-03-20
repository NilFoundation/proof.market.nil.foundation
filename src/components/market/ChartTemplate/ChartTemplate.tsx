/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useContext, useMemo, useRef } from 'react';
import { Spinner } from '@nilfoundation/react-components';
import type {
    CandlestickData,
    CandlestickStyleOptions,
    ChartOptions,
    DeepPartial,
    HistogramData,
    LineData,
    LineStyleOptions,
    SeriesOptionsCommon,
    UTCTimestamp,
    WhitespaceData,
} from 'lightweight-charts';
import { useChart, useRenderChartData } from '@/hooks';
import { formatUTCTimestamp } from '@/utils';
import { getDateFormatBasedOnDateUnit } from '@/enums';
import { ChartSettingsContext } from '../CircuitDashboard';
import { ChartLegend } from '../ChartLegend';
import './ChartTemplate.scss';

/**
 * Props.
 */
type ChartTemplateProps<T extends 'Line' | 'Candlestick'> = {
    chartName: string;
    loadingData: boolean;
    seriesType: T;
    seriesData: T extends 'Line' ? LineData[] : CandlestickData[];
    seriesOptions?: DeepPartial<
        (T extends 'Line' ? LineStyleOptions : CandlestickStyleOptions) & SeriesOptionsCommon
    >;
    chartOptions?: DeepPartial<ChartOptions>;
    volumesData?: Array<WhitespaceData | HistogramData>;
};

/**
 * Chart template.
 *
 * @param {ChartTemplateProps} props Props.
 * @returns React component.
 */
export const ChartTemplate = <T extends 'Line' | 'Candlestick'>({
    chartName,
    loadingData,
    seriesType,
    seriesData,
    seriesOptions,
    chartOptions,
    volumesData,
}: ChartTemplateProps<T>): ReactElement => {
    const ref = useRef<HTMLDivElement>(null);
    const { dataRange, displayVolumes } = useContext(ChartSettingsContext);
    const options = useMemo(
        (): DeepPartial<ChartOptions> => ({
            ...chartOptions,
            localization: {
                timeFormatter: (t: UTCTimestamp) =>
                    formatUTCTimestamp(t, getDateFormatBasedOnDateUnit(dataRange)),
            },
            timeScale: {
                tickMarkFormatter: (t: UTCTimestamp) =>
                    formatUTCTimestamp(t, getDateFormatBasedOnDateUnit(dataRange)),
                fixRightEdge: true,
            },
            rightPriceScale: {
                scaleMargins: {
                    top: 0.2,
                    bottom: displayVolumes ? 0.3 : 0.2,
                },
            },
        }),
        [chartOptions, dataRange, displayVolumes],
    );

    const { chart } = useChart({ ref, options });

    const { currentChartData } = useRenderChartData({
        seriesType,
        seriesData,
        chart,
        options: seriesOptions,
        visibleRange: dataRange,
        volumes: volumesData,
    });

    return (
        <div
            ref={ref}
            className="circuitChart"
        >
            <ChartLegend
                currentData={currentChartData}
                name={chartName}
            />
            {loadingData && seriesData.length === 0 && <Spinner grow />}
        </div>
    );
};
