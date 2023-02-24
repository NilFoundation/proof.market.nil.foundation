/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { HTMLAttributes, ReactElement } from 'react';
import styles from './ProgressBar.module.scss';

/**
 * Props.
 */
export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
    percent?: number;
    /**
     * @default true
     */
    showPercent?: boolean;
}

/**
 * ProgressBar component using bootstrap@3.4 classes.
 *
 * @param {ProgressBarProps} props Props.
 * @returns React component.
 */
export const ProgressBar = ({
    className,
    showPercent = true,
    percent,
}: ProgressBarProps): ReactElement => {
    const percentDisplay = `${percent}%`;

    return (
        <div className={`${styles.progress} ${className ?? ''} progress`}>
            <div
                className="progress-bar"
                role="progressbar"
                aria-valuenow={percent}
                aria-valuemin={0}
                aria-valuemax={100}
                style={{ width: percentDisplay, minWidth: '2em' }}
            >
                {showPercent ? (
                    percentDisplay
                ) : (
                    <span className="sr-only">{`${percentDisplay} completed`}</span>
                )}
            </div>
        </div>
    );
};
