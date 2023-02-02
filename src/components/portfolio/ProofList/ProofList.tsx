/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { ListGroup, Spinner } from '@nilfoundation/react-components';
import { selectProofList, useAppSelector } from 'src/redux';
import { useSelectedProofId } from 'src/hooks';
import { DashboardCard } from 'src/components';
import { ProofListItem } from './ProofListItem';
import styles from './ProofList.module.scss';

/**
 * Proof list.
 *
 * @returns React component.
 */
export const ProofList = (): ReactElement => {
    const proofList = useAppSelector(selectProofList);
    const loadingProofs = useAppSelector(s => s.proofState.isLoadingProofs);
    const getProofsError = useAppSelector(s => s.proofState.error);
    useSelectedProofId();

    return (
        <DashboardCard>
            <h4>Proof list</h4>
            <div className={styles.container}>
                {ProofListViewFactory(proofList, loadingProofs, getProofsError)}
            </div>
        </DashboardCard>
    );
};

/**
 * Conditionally renders proof data. First true case renders.
 *
 * @param proofList Proof list.
 * @param loadingProofs Proofs loading state.
 * @param getProofsError Proofs loading error.
 * @returns View, based on proof data state.
 */
const ProofListViewFactory = (
    proofList: ReturnType<typeof selectProofList>,
    loadingProofs: boolean,
    getProofsError: boolean,
) => {
    switch (true) {
        case loadingProofs && !proofList.length:
            return <Spinner grow />;
        case getProofsError:
            return <h5>Error while getting proofs.</h5>;
        case proofList.length === 0:
            return <h5>No proofs.</h5>;
        case !!proofList.length:
            return (
                <ListGroup className={styles.proofList}>
                    {proofList.map(x => (
                        <ProofListItem
                            proof={x}
                            key={x.id}
                        />
                    ))}
                </ListGroup>
            );
    }
};
