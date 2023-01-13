/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Container, Row, Col } from '@nilfoundation/react-components';
import { Helmet } from 'react-helmet-async';
import {
    CircuitsList,
    OrderManagementContextProvider,
    CircuitDashboard,
    OrderBook,
    CreateOrdersPanel,
    TradeHistory,
    ManageOrdersPanel,
    CircuitInfoPanel,
    LastProofProducer,
} from '../components';

/**
 * Market view.
 *
 * @returns React component.
 */
const MarketView = (): ReactElement => (
    <Container
        as="main"
        fluid
    >
        <Helmet>
            <title>Market</title>
        </Helmet>
        <Row>
            <Col
                xs={12}
                md={3}
            >
                <CircuitsList />
                <TradeHistory />
                <LastProofProducer />
            </Col>
            <OrderManagementContextProvider>
                <Col
                    xs={12}
                    md={6}
                >
                    <CircuitInfoPanel />
                    <CircuitDashboard />
                    <OrderBook />
                </Col>
                <Col
                    xs={12}
                    md={3}
                >
                    <CreateOrdersPanel />
                    <ManageOrdersPanel />
                </Col>
            </OrderManagementContextProvider>
        </Row>
    </Container>
);

export default MarketView;
