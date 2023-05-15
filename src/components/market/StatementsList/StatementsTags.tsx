/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Label } from '@nilfoundation/react-components';
import styles from './StatementsList.module.scss';

/**
 * Props.
 */
type StatementsTagsProps = {
    tags: string[];
    onRemoveTag: (tag: string) => void;
};

/**
 * Selected statements tags list.
 *
 * @param {StatementsTagsProps} props Props.
 * @returns React component.
 */
export const StatementsTags = ({ tags, onRemoveTag }: StatementsTagsProps): ReactElement => {
    return (
        <div className={styles.tagsContainer}>
            {tags.map(x => (
                <Label
                    key={x}
                    onClose={() => onRemoveTag(x)}
                >
                    {x}
                </Label>
            ))}
        </div>
    );
};
