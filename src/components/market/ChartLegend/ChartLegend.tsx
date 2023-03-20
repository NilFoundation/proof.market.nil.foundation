/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import type { BarData, LineData } from 'lightweight-charts';
import { isLineData } from '@/utils';
import styles from './ChartLegend.module.scss';

/**
 * Props.
 */
type ChartLegendProps = {
    name: string;
    currentData?: LineData | BarData;
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
            <h5 className={styles.chartName}>{name.toUpperCase()}</h5>
            {isLineData(currentData) ? (
                <div className="text-muted">{currentData?.value?.toFixed(2)}</div>
            ) : (
                (Object.keys(currentData) as Array<keyof BarData>).map(x =>
                    x !== 'time' && x !== 'color' ? (
                        <div
                            className="text-muted"
                            key={x}
                        >
                            {`${x}: ${currentData[x].toFixed(2)}`}
                        </div>
                    ) : (
                        <></>
                    ),
                )
            )}
        </div>
    );
};
