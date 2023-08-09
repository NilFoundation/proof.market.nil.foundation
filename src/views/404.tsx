/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Container, Row, Col, Button, Variant, Size } from '@nilfoundation/react-components';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Path } from '../features/routing';

/**
 * Props.
 */
type Page404Props = {
    showGoBackButton?: boolean;
};

/**
 * 404 view.
 *
 * @param {Page404Props} props Props.
 * @returns React component.
 */
const Page404 = ({ showGoBackButton = true }: Page404Props): ReactElement => (
    <Container
        as="main"
        fluid
        data-sb="404View"
    >
        <Helmet>
            <title>Page not found</title>
        </Helmet>
        <Row>
            <Col
                xs={12}
                className="text-center"
            >
                <p aria-hidden={true} />
                This page does not exist.
                {showGoBackButton && (
                    <>
                        <p aria-hidden={true} />
                        <Link to={Path.market}>
                            <Button
                                variant={Variant.primary}
                                size={Size.lg}
                            >
                                Back to market
                            </Button>
                        </Link>
                    </>
                )}
            </Col>
        </Row>
    </Container>
);

export default Page404;
