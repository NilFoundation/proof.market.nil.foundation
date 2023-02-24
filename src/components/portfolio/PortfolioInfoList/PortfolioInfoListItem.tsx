/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { ListGroup, Media } from '@nilfoundation/react-components';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'src/redux';
import styles from './PortfolioInfoList.module.scss';

/**
 * Props.
 */
type PortfolioInfoListItemProps = {
    name: string;
    itemKey: string;
    path: string;
};

/**
 * Proposal info list item.
 *
 * @param {PortfolioInfoListItemProps} props Props.
 * @returns React component.
 */
export const PortfolioInfoListItem = ({
    name,
    itemKey,
    path,
}: PortfolioInfoListItemProps): ReactElement => {
    const selectedStatementKey = useAppSelector(
        s => s.userStatementInfoState.selectedUserStatementInfoKey,
    );
    const isSelected = itemKey === selectedStatementKey;

    return (
        <ListGroup.Item active={isSelected}>
            <Link to={path}>
                <Media className={isSelected ? styles.selected : ''}>
                    <Media.Body className={styles.itemBody}>{name.toUpperCase()}</Media.Body>
                </Media>
            </Link>
        </ListGroup.Item>
    );
};
