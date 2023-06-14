/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import type { BarData, LineData, WhitespaceData } from 'lightweight-charts';
import { formatUTCTimestamp } from '@/utils';
import styles from './ChartLegend.module.scss';

/**
 * Legend data.
 */
type LegendData = LineData | BarData | WhitespaceData;

/**
 * Props.
 */
type ChartLegendProps = {
    name: string;
    currentData?: LegendData;
};

/**
 * Dashboard legend.
 *
 * @param {ChartLegendProps} props Props.
 * @returns React component.
 */
export const ChartLegend = ({ name, currentData }: ChartLegendProps): ReactElement => {
    if (currentData === undefined) {
        return <></>;
    }

    return (
        <div className={styles.chartLegend}>
            <strong className={styles.chartName}>{name.toUpperCase()}</strong>
            {currentData.time && (
                <span>{formatUTCTimestamp(currentData.time as number, 'DD.MM HH:mm')}</span>
            )}
            <LegendViewFactory data={currentData} />
        </div>
    );
};

/**
 * Conditionally renders legend data.
 *
 * @param {{data: LegendData}} props Props.
 * @returns React element.
 */
const LegendViewFactory = ({ data }: { data: LegendData }) => {
    switch (true) {
        case isLineData(data):
            return <div className="text-muted">{(data as LineData)?.value?.toFixed(2)}</div>;
        case isBarData(data):
            return (
                <>
                    {(Object.keys(data) as Array<keyof BarData>).map(
                        x =>
                            x !== 'time' &&
                            x !== 'color' && (
                                <div
                                    className="text-muted"
                                    key={x}
                                >
                                    {`${x}: ${(data as BarData)[x].toFixed(2)}`}
                                </div>
                            ),
                    )}
                </>
            );
        default:
            return <></>;
    }
};

/**
 * @param data Chart data.
 * @returns True if value is {@link BarData}.
 */
const isBarData = (data: unknown): data is BarData => {
    return (data as BarData)?.open !== undefined;
};

/**
 * @param data Chart data.
 * @returns True if value is {@link LineData}.
 */
const isLineData = (data: unknown): data is LineData => {
    return (data as LineData)?.value !== undefined;
};
