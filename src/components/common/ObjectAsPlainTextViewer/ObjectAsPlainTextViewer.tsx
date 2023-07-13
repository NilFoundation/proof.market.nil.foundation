/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import styles from './ObjectAsPlainTextViewer.module.scss';

/**
 * Props.
 */
type ObjectAsPlainTextViewerProps<T extends Record<string, unknown>> = {
    data: T;
    className?: string;
};

/**
 * Takes object as a prop and returns it plain text representation.
 *
 * @param {ObjectAsPlainTextViewerProps} props Props.
 * @returns React component.
 */
export const ObjectAsPlainTextViewer = <T extends Record<string, unknown>>({
    data,
    className,
}: ObjectAsPlainTextViewerProps<T>): ReactElement => {
    return (
        <ul className={`${styles.viewer} ${className ?? ''}`}>
            {Object.entries(data).map(([x, y]) =>
                y === undefined ? null : (
                    <li
                        key={x}
                        className={styles.item}
                    >
                        {!!x && !!y && (
                            <>
                                <strong>{x}</strong>
                                <span>{`: ${y}`}</span>
                            </>
                        )}
                    </li>
                ),
            )}
        </ul>
    );
};
