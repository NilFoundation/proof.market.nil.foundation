/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { KeyboardEventHandler, ReactElement } from 'react';
import { useCallback, useState } from 'react';
import { Button, Icon, Spinner, Variant } from '@nilfoundation/react-components';
import { getProofById } from 'src/api';
import { useDownloadJson } from 'src/hooks';
import type { Proof } from 'src/models';
import { ProgressBar } from 'src/components/common';
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
    const [showProgress, setShowProgress] = useState(false);
    const [downloadPergent, setDownloadPercent] = useState(0);
    const fetcher = useCallback(async () => {
        setShowProgress(true);
        const result = await getProofById(proof!._key, ({ percent }) =>
            setDownloadPercent(percent * 100),
        );
        setDownloadPercent(0);
        setShowProgress(false);

        return result;
    }, [proof, setDownloadPercent, setShowProgress]);

    const { downloadJson, loading } = useDownloadJson({
        fileName: `proof-${proof?._key}`,
        fetcher: proof?._key !== undefined ? fetcher : undefined,
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
            {showProgress && (
                <div className={styles.progressContainer}>
                    <ProgressBar percent={Number(downloadPergent.toFixed(2))} />
                </div>
            )}
        </div>
    );
};
