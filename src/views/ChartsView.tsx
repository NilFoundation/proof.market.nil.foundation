/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { Container, Row, Col } from '@nilfoundation/react-components';
import { useParams, useSearchParams } from 'react-router-dom';
import { ChartType, DateUnit, RouterParam, RouterSearchParam } from '@/enums';
import type { ChartBaseProps } from '@/components';
import { ProofTimeGenChart, ProofCostChart } from '@/components';
import { useSyncUrlAndSelectedItem, useWindowHeight } from '@/hooks';
import { selectCircuits, selectCurrentCircuit, UpdateSelectedCircuitKey } from '@/redux';

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
    const windowHeight = useWindowHeight();

    const computedDateRange: DateUnit = useMemo(
        () =>
            Object.values(DateUnit).some(x => x === dateRange)
                ? (dateRange as DateUnit)
                : DateUnit.minute,
        [dateRange],
    );

    useSyncUrlAndSelectedItem({
        urlParamToSync: RouterParam.statementName,
        actionToUpdateSelectedItem: UpdateSelectedCircuitKey,
        itemSelector: selectCurrentCircuit,
        allItemsSelector: selectCircuits,
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
    switch (chartType) {
        case ChartType.proofCostChart:
            return <ProofCostChart {...rest} />;
        case ChartType.proofGetTimeChart:
            return <ProofTimeGenChart {...rest} />;
        default:
            return <></>;
    }
};
