/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { ListGroup, Media } from '@nilfoundation/react-components';
import { Link, useMatch } from 'react-router-dom';
import styles from './PortfolioInfoList.module.scss';

/**
 * Props.
 */
type PortfolioInfoListItemProps = {
  name: string;
  path: string;
};

/**
 * Proposal info list item.
 *
 * @param {PortfolioInfoListItemProps} props Props.
 * @returns React component.
 */
export const PortfolioInfoListItem = ({ name, path }: PortfolioInfoListItemProps): ReactElement => {
  const isSelected = useMatch({
    path: path,
    end: false,
  });

  return (
    <ListGroup.Item active={!!isSelected}>
      <Link to={path}>
        <Media className={isSelected ? styles.selected : ''}>
          <Media.Body className={styles.itemBody}>{name.toUpperCase()}</Media.Body>
        </Media>
      </Link>
    </ListGroup.Item>
  );
};
