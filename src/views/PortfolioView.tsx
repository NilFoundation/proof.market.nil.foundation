/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { memo } from 'react';
import { Container, Row, Col, Spinner } from '@nilfoundation/react-components';
import { Outlet, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import loadable from '@loadable/component';
import { Path } from 'src/routing';
import { DashboardCard, PortfolioNavbar } from '../components';

const ProofList = loadable(
    () =>
        import(/* webpackChunkName: "UserBalance" */ '../components/portfolio/ProofList/ProofList'),
    {
        fallback: <Spinner grow />,
    },
);

/**
 * Portfolio view.
 *
 * @returns React component.
 */
const PortfolioView = (): ReactElement => {
    const { pathname } = useLocation();

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
                <Col
                    xs={12}
                    md={3}
                >
                    <DashboardCard>
                        <PortfolioItemsListFactory pathname={pathname} />
                    </DashboardCard>
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
};

export default PortfolioView;

/**
 * Renders items list based on current location.
 */
const PortfolioItemsListFactory = memo(function PortfolioItemsListFactory({
    pathname,
}: {
    pathname: string;
}) {
    switch (true) {
        case pathname.includes(Path.proof):
            return <ProofList />;
        default:
            return <></>;
    }
});
