/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Container, Row, Col } from '@nilfoundation/react-components';
import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PortfolioNavbar } from '../components';

/**
 * Portfolio view.
 *
 * @returns React component.
 */
const PortfolioView = (): ReactElement => {
    return (
        <Container
            as="main"
            fluid
            data-sb="portfolioView"
        >
            <Helmet>
                <title>Portfolio</title>
            </Helmet>
            <Row>
                <Col xs={12}>
                    <PortfolioNavbar />
                </Col>
                <Col xs={12}>
                    <Outlet />
                </Col>
            </Row>
        </Container>
    );
};

export default PortfolioView;
