/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemLabel } from '@nilfoundation/ui-kit';
import { useAppSelector } from '@/redux';
import { Path } from '@/features/routing';
import type { StatementsListData } from '@/models';
import { siteMoneyTickerAbbreviation } from '@/constants';
import { ListItemInfo } from './ListItemInfo';

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
  const isSelected = useAppSelector(s => s.statementsState.selectedKey === _key);

  return (
    <Link to={`${Path.market}/${name}`}>
      <ListItem
        isActive={isSelected}
        endEnhancer={() => (
          <ListItemInfo
            cost={cost}
            change={change}
            isSelected={isSelected}
          />
        )}
      >
        <ListItemLabel description={tag}>{`${name}/${siteMoneyTickerAbbreviation}`}</ListItemLabel>
      </ListItem>
    </Link>
  );
};
