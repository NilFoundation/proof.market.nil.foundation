/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useContext } from 'react';
import { Chart, HistogramSeries, LineSeries, Spinner } from '@nilfoundation/ui-kit';
import { useGetStatementDashboardData } from '@/hooks';
import { seriesDefaultOptions, volumeSeriesOptions } from './chartsCommonSettings';
import { DashboardContext } from '../Dashboard/DashboardContext';

/**
 * Proof cost chart.
 *
 * @returns React component.
 */
export const ProofTimeGenChart = (): ReactElement => {
  const { displayVolume, dateRange } = useContext(DashboardContext);
  const {
    chartData: { proofGenTimeData, volumesData },
    loadingData: isLoadingChartData,
  } = useGetStatementDashboardData(displayVolume, dateRange);

  return (
    <div>
      {isLoadingChartData && proofGenTimeData.length === 0 ? (
        <Spinner animation />
      ) : (
        <Chart>
          <LineSeries
            data={proofGenTimeData}
            reactive
            options={seriesDefaultOptions}
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
