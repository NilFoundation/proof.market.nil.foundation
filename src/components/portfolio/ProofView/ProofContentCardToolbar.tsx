/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { KeyboardEventHandler, ReactElement, useMemo } from 'react';
import { Button, Icon, Spinner, Variant } from '@nilfoundation/react-components';
import { Proof } from 'src/models';
import { getProofById } from 'src/api';
import { useDownloadJson } from 'src/hooks';
import styles from './ProofContentCard.module.scss';

/**
 * Props.
 */
type ProofViewHeaderProps = {
    proof?: Proof;
};

/**
 * Proof content card header.
 *
 * @param {ProofViewHeaderProps} props Props.
 * @returns React component.
 */
export const ProofContentCardToolbar = ({ proof }: ProofViewHeaderProps): ReactElement => {
    const fetcher = useMemo(
        () => (proof?._key !== undefined ? () => getProofById(proof._key) : undefined),
        [proof?._key],
    );
    const { downloadJson, loading } = useDownloadJson({
        fileName: `proof-${proof?._key}`,
        fetcher,
    });

    const keyDownHandler: KeyboardEventHandler = e => {
        if (e.key !== 'Enter' && e.key !== ' ') {
            return;
        }

        downloadJson();
    };

    return (
        <div className={styles.toolbar}>
            <Button
                variant={Variant.primary}
                disabled={proof === undefined || loading}
                onClick={downloadJson}
                onKeyDown={keyDownHandler}
                aria-label="Download proof as JSON file"
            >
                <Icon iconName="fa-solid fa-download" />
                JSON
                {loading && <Spinner />}
            </Button>
        </div>
    );
};