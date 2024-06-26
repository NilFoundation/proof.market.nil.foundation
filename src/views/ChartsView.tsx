/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { Container, Row, Col } from '@nilfoundation/react-components';
import { useParams, useSearchParams } from 'react-router-dom';
import { match } from 'ts-pattern';
import { ChartType, DateUnit, RouterParam, RouterSearchParam } from '@/enums';
import type { ChartBaseProps } from '@/components';
import { ProofTimeGenChart, ProofCostChart } from '@/components';
import { useSyncUrlAndSelectedItem } from '@/hooks';
import { selectStatements, selectCurrentStatement, UpdateSelectedStatementKey } from '@/redux';
import { useWindowDimensions } from '@/features/shared';

/**
 * Charts view.
 *
 * @returns React component.
 */
const ChartsView = (): ReactElement => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const chartType = params[RouterParam.chartType];
  const dateRange = searchParams.get(RouterSearchParam.chartDataRange);
  const displayVolumes = searchParams.get(RouterSearchParam.chartDisplayVolumes);
  const { height: windowHeight } = useWindowDimensions();

  const computedDateRange: DateUnit = useMemo(
    () =>
      Object.values(DateUnit).some(x => x === dateRange)
        ? (dateRange as DateUnit)
        : DateUnit.minute,
    [dateRange],
  );

  useSyncUrlAndSelectedItem({
    urlParamToSync: RouterParam.statementName,
    actionToUpdateSelectedItem: UpdateSelectedStatementKey,
    itemSelector: selectCurrentStatement,
    allItemsSelector: selectStatements,
  });

  return (
    <Container
      as="main"
      fluid
    >
      <Row noGutters>
        <Col xs={12}>
          <ChartsViewFactory
            chartType={chartType}
            displayVolumes={!!displayVolumes}
            dataRange={computedDateRange}
            height={windowHeight - 24}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ChartsView;

const ChartsViewFactory = ({ chartType, ...rest }: { chartType?: string } & ChartBaseProps) => {
  return match(chartType)
    .with(ChartType.proofCostChart, () => <ProofCostChart {...rest} />)
    .with(ChartType.proofGetTimeChart, () => <ProofTimeGenChart {...rest} />)
    .otherwise(() => <></>);
};
