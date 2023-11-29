/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useState } from 'react';
import { CandlestickSeries, Chart } from '@nilfoundation/ui-kit';
import type { CandlestickData, CandlestickSeriesPartialOptions } from 'lightweight-charts';
import { useGetStatementDashboardData } from '../../hooks/useGetStatementDashboardData';

/**
 * Proof cost chart.
 *
 * @returns React component.
 */
export const ProofCostChart = (): ReactElement => {
  const [legendData, setLegendData] = useState<CandlestickData | null>(null);
  const {
    chartData: { candlestickChartData, volumesData },
    loadingData: isLoadingChartData,
  } = useGetStatementDashboardData(props.displayVolumes, props.dataRange);

  return (
    <Chart>
      <CandlestickSeries
        data={candlestickChartData}
        reactive
        options={seriesDefaultOptions}
      />
    </Chart>
  );
};

/**
 * Series default options.
 */
const seriesDefaultOptions: CandlestickSeriesPartialOptions = {
  priceFormat: {
    type: 'price',
    precision: 4,
    minMove: 0.0001,
  },
};
