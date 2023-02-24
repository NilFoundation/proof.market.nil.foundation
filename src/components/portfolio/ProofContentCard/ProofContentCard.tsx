/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Spinner } from '@nilfoundation/react-components';
import { selectSelectedProofKey, useAppSelector } from 'src/redux';
import { DashboardCard, ObjectAsPlainTextViewer } from 'src/components';
import type { Proof } from 'src/models';
import { ProofContentCardToolbar } from './ProofContentCardToolbar';
import styles from './ProofContentCard.module.scss';

/**
 * Proof content card.
 *
 * @returns React component.
 */
const ProofContentCard = (): ReactElement => {
    const selectedProofId = useAppSelector(selectSelectedProofKey);
    const isLoadingProofs = useAppSelector(s => s.proofState.isLoadingProofs);
    const proofData = useAppSelector(s =>
        s.proofState.proofs.find(x => x._key === selectedProofId),
    );

    return (
        <DashboardCard>
            <h4>Proof detailed info</h4>
            <div className={styles.container}>{ProofViewFactory(isLoadingProofs, proofData)}</div>
        </DashboardCard>
    );
};

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
                    <ObjectAsPlainTextViewer data={proof!} />
                    <ProofContentCardToolbar proof={proof} />
                </>
            );
        case proof === undefined:
            return <h5>No proof data was found.</h5>;
    }
};

export default ProofContentCard;
