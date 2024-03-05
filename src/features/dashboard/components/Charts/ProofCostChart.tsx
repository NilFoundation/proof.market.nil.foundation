/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useContext, useRef } from 'react';
import { CandlestickSeries, Chart, HistogramSeries, Spinner } from '@nilfoundation/ui-kit';
import type { ISeriesApi } from 'lightweight-charts';
import { useGetStatementDashboardData } from '../../hooks/useGetStatementDashboardData';
import { DashboardContext } from '../Dashboard/DashboardContext';
import { seriesDefaultOptions, volumeSeriesOptions } from './chartsCommonSettings';

/**
 * Proof cost chart.
 *
 * @returns React component.
 */
export const ProofCostChart = (): ReactElement => {
  const { displayVolume, dateRange } = useContext(DashboardContext);
  const {
    chartData: { candlestickChartData, volumesData },
    loadingData: isLoadingChartData,
  } = useGetStatementDashboardData(displayVolume, dateRange);
  const series = useRef<ISeriesApi<'Candlestick'> | null>(null);

  return (
    <div>
      {isLoadingChartData && candlestickChartData.length === 0 ? (
        <Spinner animation />
      ) : (
        <Chart>
          <CandlestickSeries
            data={candlestickChartData}
            reactive
            options={seriesDefaultOptions}
            onInit={api => {
              series.current = api;
            }}
          />
          {displayVolume && volumesData?.length && (
            <HistogramSeries
              data={volumesData}
              options={volumeSeriesOptions}
            />
          )}
        </Chart>
      )}
    </div>
  );
};
