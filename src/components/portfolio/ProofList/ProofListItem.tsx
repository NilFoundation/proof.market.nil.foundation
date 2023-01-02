/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { ListGroup, Media } from '@nilfoundation/react-components';
import { Link } from 'react-router-dom';
import { Path } from 'src/routing';
import { Proof } from 'src/models';
import { selectSelectedProofId, useAppSelector } from 'src/redux';
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
export const ProofListItem = ({ proof: { id } }: ProofListItemProps): ReactElement => {
    const selectedProofId = useAppSelector(selectSelectedProofId);
    const isSelected = id === selectedProofId;

    return (
        <ListGroup.Item active={isSelected}>
            <Link to={`${Path.portfolio}/${id}`}>
                <Media className={isSelected ? styles.selected : ''}>
                    <Media.Body className={styles.itemBody}>{`id: ${id}`}</Media.Body>
                </Media>
            </Link>
        </ListGroup.Item>
    );
};