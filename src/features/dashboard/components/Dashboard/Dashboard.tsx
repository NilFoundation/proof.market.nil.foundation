/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useState } from 'react';
import { match } from 'ts-pattern';
import { Card } from '@nilfoundation/ui-kit';
import { ChartType } from '@/enums';
import { selectCurrentStatement, useAppSelector } from '@/redux';
import { useLocalStorage } from '@/hooks';
import { ChartTypeSelect } from './ChartTypeSelect';
import { DataRangeSelect } from './DataRangeSelect';
import { DashboardToolbar } from './DashboardToolbar';
import { CopyToClipboardNavItem } from './CopyToClipboardNavItem';
import { getCardOverrides } from './overrides';
import { ProofCostChart } from '../Charts/ProofCostChart';
import { ProofTimeGenChart } from '../Charts/ProofGenTimeChart';
import { DateUnit } from '../../models/DateUnit';

/**
 * Statement dashboard.
 *
 * @returns React component.
 */
const StatementDashboard = (): ReactElement => {
  const currentStatement = useAppSelector(selectCurrentStatement);
  const [chartType, setChartType] = useState(ChartType.proofCostChart);

  const [dataRange, setDataRange] = useLocalStorage<DateUnit>(
    'statementDashboardDataRange',
    DateUnit.hour,
  );

  const [displayVolumes, setDisplayVolumes] = useLocalStorage(
    'statementDashboardDisplayVolumes',
    false,
  );

  return (
    <Card
      headline
      overrides={getCardOverrides()}
    >
      <div className="statementDashboard">
        <ChartTypeSelect
          chartType={chartType}
          onSelectChartType={setChartType}
          disabled={!currentStatement}
        />
        <div className="statementDashboard__toolbar">
          <DataRangeSelect
            disabled={!currentStatement}
            dataRange={dataRange}
            setDataRange={setDataRange}
          />
          <DashboardToolbar
            disabled={!currentStatement}
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
        <ChartFactory chartType={chartType} />
      </div>
    </Card>
  );
};

/**
 * Renders chart depending on its type.
 *
 * @param {{chartType: ChartType}} props Props.
 * @returns Chart.
 */
const ChartFactory = ({ chartType }: { chartType: ChartType }) => {
  return match(chartType)
    .with(ChartType.proofCostChart, () => <ProofCostChart />)
    .with(ChartType.proofGetTimeChart, () => <ProofTimeGenChart />)
    .otherwise(() => <></>);
};

export default StatementDashboard;
