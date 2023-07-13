/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { HTMLAttributes, KeyboardEventHandler, ReactElement } from 'react';
import { useCallback, useState, memo } from 'react';
import { Button, Spinner, Variant } from '@nilfoundation/react-components';
import { getProofById } from '@/api';
import { ObjectAsPlainTextViewer, ProgressBar } from '@/components/common';
import { useDownloadJson } from '@/hooks';
import type { Proof } from '@/models';
import { mapToHumanReadableProof } from '@/models';
import styles from './ProofList.module.scss';

/**
 * Props.
 */
type ProofListItemProps = {
    proof: Proof;
} & HTMLAttributes<HTMLDivElement>;

/**
 * Proof list item.
 *
 * @param {ProofListItemProps} props Props.
 * @returns React component.
 */
export const ProofListItem = memo(function ProofListItem({
    proof,
    ...restProps
}: ProofListItemProps): ReactElement {
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
        <div
            {...restProps}
            className={styles.item}
        >
            <Button
                variant={Variant.primary}
                disabled={proof === undefined || loading}
                onClick={downloadJson}
                onKeyDown={keyDownHandler}
                aria-label="Download proof as JSON file"
                className={styles.button}
            >
                JSON
                {loading && <Spinner />}
            </Button>
            {showProgress && (
                <div className={styles.progressContainer}>
                    <ProgressBar
                        className={styles.progress}
                        showPercent={false}
                        percent={Number(downloadPergent.toFixed(2))}
                    />
                </div>
            )}
            <ObjectAsPlainTextViewer data={mapToHumanReadableProof(proof)} />
        </div>
    );
},
arePropsEqual);

function arePropsEqual(prevProps: ProofListItemProps, nextprops: ProofListItemProps) {
    return prevProps.proof._key === nextprops.proof._key;
}
