/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Col, Row, Spinner } from '@nilfoundation/react-components';
import { selectSelectedProofKey, useAppSelector } from 'src/redux';
import { DashboardCard, ObjectAsPlainTextViewer, ProofList } from 'src/components';
import { mapToHumanReadableProof, Proof } from 'src/models';
import { ProofContentToolbar } from './ProofContentToolbar';
import styles from './ProofContent.module.scss';

/**
 * Proof content.
 *
 * @returns React component.
 */
const ProofContent = (): ReactElement => {
    const selectedProofId = useAppSelector(selectSelectedProofKey);
    const isLoadingProofs = useAppSelector(s => s.proofState.isLoadingProofs);
    const proofData = useAppSelector(s =>
        s.proofState.proofs.find(x => x._key === selectedProofId),
    );

    return (
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
                <DashboardCard>
                    <h4>Proof detailed info</h4>
                    <div className={styles.container}>
                        {ProofViewFactory(isLoadingProofs, proofData)}
                    </div>
                </DashboardCard>
            </Col>
        </Row>
    );
};

export default ProofContent;

/**
 * Conditionally renders proof data. First true case renders.
 *
 * @param loadingProofs Loading proof data from dbms.
 * @param proof Proof data.
 * @returns View, based on proof data state.
 */
const ProofViewFactory = (loadingProofs: boolean, proof?: Proof) => {
    switch (true) {
        case loadingProofs && !proof:
            return <Spinner grow />;
        case proof !== undefined:
            return (
                <>
                    <ObjectAsPlainTextViewer data={mapToHumanReadableProof(proof!)} />
                    <ProofContentToolbar proof={proof} />
                </>
            );
        case proof === undefined:
            return <h5>No proof data was found.</h5>;
    }
};
