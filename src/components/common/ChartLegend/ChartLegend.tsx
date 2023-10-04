/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import type { BarData, LineData, WhitespaceData } from 'lightweight-charts';
import { P, match } from 'ts-pattern';
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
  return (
    <div className={styles.chartLegend}>
      <strong className={styles.chartName}>{name.toUpperCase()}</strong>
      {currentData && currentData.time && (
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
const LegendViewFactory = ({ data }: { data?: LegendData }) => {
  return match(data)
    .with({ open: P._ }, data => (
      <>
        {(Object.keys(data) as Array<keyof BarData>).map(
          x =>
            x !== 'time' &&
            x !== 'color' && (
              <div
                className="text-muted"
                key={x}
              >
                {`${x}: ${data[x].toFixed(2)}`}
              </div>
            ),
        )}
      </>
    ))
    .with({ value: P._ }, ({ value }) => <div className="text-muted">{value?.toFixed(2)}</div>)
    .otherwise(() => <></>);
};
