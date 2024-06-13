/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Container, Row, Col } from '@nilfoundation/react-components';
import { Helmet } from 'react-helmet-async';
import { StatementsList } from '@/features/statementsList';
import { TradeHistory } from '@/features/trades';
import { LastProofProducerCard } from '@/features/lastProofProducer';
import { StatementInfoPanel, Dashboard } from '@/features/dashboard';
import {
  OrderManagementContextProvider,
  OrderBook,
  CreateOrdersPanel,
  ManageOrdersPanel,
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
    data-sb="mainView"
  >
    <Helmet>
      <title>Market</title>
    </Helmet>
    <Row>
      <Col
        xs={12}
        md={3}
      >
        <StatementsList />
        <TradeHistory />
        <LastProofProducerCard />
      </Col>
      <OrderManagementContextProvider>
        <Col
          xs={12}
          md={6}
        >
          <StatementInfoPanel />
          <Dashboard />
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
