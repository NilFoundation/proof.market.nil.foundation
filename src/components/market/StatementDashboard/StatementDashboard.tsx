/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useState } from 'react';
import { ChartType, DateUnit } from '@/enums';
import { selectCurrentStatement, useAppSelector } from '@/redux';
import { useLocalStorage, useWindowHeight } from '@/hooks';
import type { ChartBaseProps } from '../../common';
import { DashboardCard, FullScreenView, ProofCostChart, ProofTimeGenChart } from '../../common';
import { ChartTypeSelect } from './ChartTypeSelect';
import { DataRangeSelect } from './DataRangeSelect';
import { DashboardToolbar } from './DashboardToolbar';
import { StatementInfoPanel } from '../StatementInfoPanel';
import { CopyToClipboardNavItem } from './CopyToClipboardNavItem';
import './StatementDashboard.scss';

/**
 * Statement dashboard.
 *
 * @returns React component.
 */
export const StatementDashboard = (): ReactElement => {
  const currentStatement = useAppSelector(selectCurrentStatement);
  const [chartType, setChartType] = useState(ChartType.proofCostChart);
  const [fullScreen, setFullScreen] = useState(false);
  const windowHeight = useWindowHeight();

  const [dataRange, setDataRange] = useLocalStorage<DateUnit>(
    'statementDashboardDataRange',
    DateUnit.hour,
  );

  const [displayVolumes, setDisplayVolumes] = useLocalStorage(
    'statementDashboardDisplayVolumes',
    false,
  );

  return (
    <DashboardCard>
      <div className="statementDashboard">
        <ChartTypeSelect
          chartType={chartType}
          onSelectChartType={setChartType}
          disabled={!currentStatement}
        />
        <FullScreenView
          showFullScreen={fullScreen}
          className="fullScreenChartContainer"
        >
          {fullScreen && <StatementInfoPanel />}
          <div className="statementDashboard__toolbar">
            <DataRangeSelect
              disabled={!currentStatement}
              dataRange={dataRange}
              setDataRange={setDataRange}
            />
            <DashboardToolbar
              disabled={!currentStatement}
              isFullscreen={fullScreen}
              setFullScreen={setFullScreen}
              displayVolumes={displayVolumes}
              setDisplayVolumes={setDisplayVolumes}
            >
              <CopyToClipboardNavItem
                disabled={!currentStatement}
                chartType={chartType}
                chartDataRange={dataRange}
                displayVolumes={displayVolumes}
              />
            </DashboardToolbar>
          </div>
          <ChartFactory
            chartType={chartType}
            dataRange={dataRange}
            displayVolumes={displayVolumes}
            height={fullScreen ? windowHeight - 283 : 454}
          />
        </FullScreenView>
      </div>
    </DashboardCard>
  );
};

/**
 * Renders chart depending on its type.
 *
 * @param {{chartType: ChartType}} props Props.
 * @returns Chart.
 */
const ChartFactory = ({ chartType, ...rest }: { chartType: ChartType } & ChartBaseProps) => {
  switch (chartType) {
    case ChartType.proofCostChart:
      return <ProofCostChart {...rest} />;
    case ChartType.proofGetTimeChart:
      return <ProofTimeGenChart {...rest} />;
    default:
      return <></>;
  }
};
