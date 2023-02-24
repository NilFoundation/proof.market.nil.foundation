/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Container, Row, Col } from '@nilfoundation/react-components';
import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PortfolioNavbar, ProofList } from '../components';

/**
 * Portfolio view.
 *
 * @returns React component.
 */
const PortfolioView = (): ReactElement => (
    <Container
        as="main"
        fluid
        data-sb="portfolioView"
    >
        <Helmet>
            <title>Portfolio</title>
        </Helmet>
        <Row>
            <Col
                xs={12}
                md={3}
            >
                <ProofList />
            </Col>
            <Col
                xs={12}
                md={9}
            >
                <PortfolioNavbar />
                <Outlet />
            </Col>
        </Row>
    </Container>
);

export default PortfolioView;
