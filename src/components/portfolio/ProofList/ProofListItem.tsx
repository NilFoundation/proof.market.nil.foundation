/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { ListGroup, Media } from '@nilfoundation/react-components';
import { Link } from 'react-router-dom';
import { Path } from 'src/routing';
import { selectSelectedProofKey, useAppSelector } from 'src/redux';
import type { Proof } from 'src/models';
import styles from './ProofList.module.scss';

/**
 * Props.
 */
type ProofListItemProps = {
    proof: Proof;
};

/**
 * Proof list item.
 *
 * @param {ProofListItemProps} props Props.
 * @returns React component.
 */
export const ProofListItem = ({ proof: { _key } }: ProofListItemProps): ReactElement => {
    const selectedProofId = useAppSelector(selectSelectedProofKey);
    const isSelected = _key === selectedProofId;

    return (
        <ListGroup.Item active={isSelected}>
            <Link to={`${Path.portfolio}/${Path.requests}/${_key}`}>
                <Media className={isSelected ? styles.selected : ''}>
                    <Media.Body className={styles.itemBody}>{`id: ${_key}`}</Media.Body>
                </Media>
            </Link>
        </ListGroup.Item>
    );
};
