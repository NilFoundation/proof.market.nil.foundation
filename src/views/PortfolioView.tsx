/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Container, Row, Col } from '@nilfoundation/react-components';
import { ProofList, SelectedProofContextProvider, ProofView } from '../components';

/**
 * Portfolio view.
 *
 * @returns React component.
 */
const PortfolioView = (): ReactElement => (
    <Container
        as="main"
        fluid
    >
        <Row>
            <SelectedProofContextProvider>
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
                    <ProofView />
                </Col>
            </SelectedProofContextProvider>
        </Row>
    </Container>
);

export default PortfolioView;
