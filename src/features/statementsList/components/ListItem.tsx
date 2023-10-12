/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { ListItem as BaseListItem, ListItemLabel } from '@nilfoundation/ui-kit';
import { useAppSelector } from '@/redux';
import { Path } from '@/features/routing';
import type { StatementsListData } from '@/models';
import { siteMoneyTickerAbbreviation } from '@/constants';
import { ListItemInfo } from './ListItemInfo';

/**
 * Props.
 */
type ListItemProps = {
  data: StatementsListData;
};

/**
 * Currencies list item.
 *
 * @param {ListItemProps} props - Props.
 * @returns React component.
 */
export const ListItem = ({
  data: { _key, cost, change, name, tag },
}: ListItemProps): ReactElement => {
  const isSelected = useAppSelector(s => s.statementsState.selectedKey === _key);

  return (
    <Link to={`${Path.market}/${name}`}>
      <BaseListItem
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
      </BaseListItem>
    </Link>
  );
};
