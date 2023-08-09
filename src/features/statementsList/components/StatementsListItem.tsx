/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Label, ListGroup, Media } from '@nilfoundation/react-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentStatementKey } from '@/redux';
import { Path } from '@/features/routing';
import type { StatementsListData } from '@/models';
import { siteMoneyTickerAbbreviation } from '@/constants';
import { StatementsListItemInfo } from './StatementsListItemInfo';
import styles from './StatementsList.module.scss';

/**
 * Props.
 */
type CurcuitsListItemProps = {
    data: StatementsListData;
};

/**
 * Currencies list item.
 *
 * @param {CurcuitsListItemProps} props - Props.
 * @returns React component.
 */
export const CurcuitsListItem = ({
    data: { _key, cost, change, name, tag },
}: CurcuitsListItemProps): ReactElement => {
    const selectedKey = useSelector(selectCurrentStatementKey);
    const isSelected = _key === selectedKey;

    return (
        <ListGroup.Item active={isSelected}>
            <Link to={`${Path.market}/${name}`}>
                <Media className={isSelected ? styles.selected : ''}>
                    <Media.Body className={styles.itemBody}>
                        {`${name.toUpperCase()}/${siteMoneyTickerAbbreviation}`}
                        {tag && (
                            <div>
                                <Label
                                    rounded
                                    className={styles.tag}
                                >
                                    {tag}
                                </Label>
                            </div>
                        )}
                    </Media.Body>
                    <StatementsListItemInfo
                        cost={cost}
                        change={change}
                        isSelected={isSelected}
                    />
                </Media>
            </Link>
        </ListGroup.Item>
    );
};
