/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useMemo, useRef } from 'react';
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
import { ChartLegend } from '../ChartLegend';
import type { ChartBaseProps } from './ChartBaseProps';
import styles from './ChartTemplate.module.scss';

/**
 * Props.
 */
type ChartTemplateProps<T extends 'Line' | 'Candlestick'> = ChartBaseProps & {
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
    dataRange,
    displayVolumes,
    height,
}: ChartTemplateProps<T>): ReactElement => {
    const ref = useRef<HTMLDivElement>(null);
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
                fixLeftEdge: true,
            },
            rightPriceScale: {
                scaleMargins: {
                    top: 0.2,
                    bottom: displayVolumes ? 0.3 : 0.2,
                },
            },
            leftPriceScale: {
                visible: displayVolumes,
            },
            crosshair: {
                mode: 0,
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
            className={styles.chart}
            style={{ height }}
        >
            <ChartLegend
                currentData={currentChartData}
                name={chartName}
            />
            {loadingData && seriesData.length === 0 && (
                <div className={styles.spinner}>
                    <Spinner />
                </div>
            )}
        </div>
    );
};
