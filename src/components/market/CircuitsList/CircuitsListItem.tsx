/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { ListGroup, Media } from '@nilfoundation/react-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentCircuitId } from 'src/redux';
import { Path } from 'src/routing';
import { CircuitsListData } from 'src/models';
import { CircuitsListItemInfo } from './CircuitsListItemInfo';
import styles from './CircuitsList.module.scss';

/**
 * Props.
 */
type CurcuitsListItemProps = {
    data: CircuitsListData;
};

/**
 * Currencies list item.
 *
 * @param {CurcuitsListItemProps} props - Props.
 * @returns React component.
 */
export const CurcuitsListItem = ({
    data: { id, cost, change, name },
}: CurcuitsListItemProps): ReactElement => {
    const selectedId = useSelector(selectCurrentCircuitId);
    const isSelected = id === selectedId;

    return (
        <ListGroup.Item active={isSelected}>
            <Link to={`${Path.market}/${id}`}>
                <Media className={isSelected ? styles.selected : ''}>
                    <Media.Body className={styles.itemBody}>{name}</Media.Body>
                    <CircuitsListItemInfo
                        cost={cost}
                        change={change}
                        isSelected={isSelected}
                    />
                </Media>
            </Link>
        </ListGroup.Item>
    );
};
