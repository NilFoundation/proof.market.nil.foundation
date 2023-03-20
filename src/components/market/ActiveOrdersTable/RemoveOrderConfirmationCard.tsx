/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { forwardRef } from 'react';
import { Button, Variant, Spinner } from '@nilfoundation/react-components';
import styles from './ActiveOrdersTable.module.scss';

/**
 * Props.
 */
type RemoveOrderConfirmationCardProps = {
    onAccept: () => void;
    onDecline: () => void;
    processing: boolean;
    message: string;
    error?: string;
};

/**
 * Remove order confirmation card.
 *
 * @param {RemoveOrderConfirmationCardProps} props Props.
 * @returns React component.
 */
export const RemoveOrderConfirmationCard = forwardRef<
    HTMLDivElement,
    RemoveOrderConfirmationCardProps
>(function RemoveOrderConfirmationCard(
    { onAccept, onDecline, processing, message, error },
    ref,
): ReactElement {
    return (
        <div
            className={styles.confirmationCard}
            ref={ref}
        >
            <div className={`${styles.confirmationCardMessage} ${error ? styles.error : ''}`}>
                {error ? error : message}
            </div>
            <div className={styles.confirmationCardButtons}>
                <Button
                    onClick={onAccept}
                    variant={Variant.success}
                    disabled={processing}
                >
                    Remove
                    {processing && <Spinner />}
                </Button>
                <Button
                    onClick={onDecline}
                    variant={Variant.danger}
                    disabled={processing}
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
});
