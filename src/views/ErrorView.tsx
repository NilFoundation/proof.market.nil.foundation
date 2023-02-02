/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Container, Row, Col } from '@nilfoundation/react-components';
import { mainSiteAddress } from 'src/constants';

/**
 * App Error view.
 *
 * @returns React component.
 */
const ErrorView = (): ReactElement => (
    <Container
        as="main"
        fluid
    >
        <Row>
            <Col
                xs={12}
                className="text-center"
            >
                <h4>Sorry, unknown error occured.</h4>
                <p className="text-muted">
                    Please, try to reload page or leave message to support.
                </p>
                <p>
                    <a href={mainSiteAddress}>{mainSiteAddress}</a>
                </p>
            </Col>
        </Row>
    </Container>
);

export default ErrorView;
