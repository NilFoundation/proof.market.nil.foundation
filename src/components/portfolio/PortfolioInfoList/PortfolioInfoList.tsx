/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useCallback, memo } from 'react';
import { ListGroup, Spinner } from '@nilfoundation/react-components';
import { DashboardCard } from '@/components/common';
import { Path } from '@/features/routing';
import { PortfolioInfoListItem } from './PortfolioInfoListItem';
import styles from './PortfolioInfoList.module.scss';

/**
 * Props.
 */
type PortfolioInfoListProps<T extends { _key: string; name: string }> = {
  items: T[];
  isLoadingItems: boolean;
  isError: boolean;
  itemsLinksSubPath: Path;
  title: string;
};

/**
 * Portfolio info list.
 *
 * @param {PortfolioInfoListProps} props Props.
 * @returns React component.
 */
export const PortfolioInfoList = <T extends { _key: string; name: string }>({
  items,
  isLoadingItems,
  isError,
  itemsLinksSubPath,
  title,
}: PortfolioInfoListProps<T>): ReactElement => {
  const renderItemsList = useCallback(
    () => (
      <ListGroup className={styles.list}>
        {items.map(({ name, _key }) => (
          <PortfolioInfoListItem
            name={name}
            key={_key}
            path={`${Path.portfolio}/${itemsLinksSubPath}/${name}`}
          />
        ))}
      </ListGroup>
    ),
    [items, itemsLinksSubPath],
  );

  return (
    <DashboardCard>
      <h4>{title}</h4>
      <div className={styles.container}>
        <PortfolioInfoListViewFactory
          itemsLength={items.length}
          isLoadingItems={isLoadingItems}
          getItemsError={isError}
          renderItemsList={renderItemsList}
        />
      </div>
    </DashboardCard>
  );
};

const PortfolioInfoListViewFactory = memo(function ListViewFactory({
  itemsLength,
  isLoadingItems,
  getItemsError,
  renderItemsList,
}: {
  itemsLength: number;
  isLoadingItems: boolean;
  getItemsError: boolean;
  renderItemsList: () => ReactElement;
}) {
  switch (true) {
    case isLoadingItems && !itemsLength:
      return <Spinner grow />;
    case getItemsError:
      return <h5>Error while getting statements info.</h5>;
    case itemsLength === 0:
      return <h5>No statements found.</h5>;
    case !!itemsLength:
      return renderItemsList();
    default:
      return <></>;
  }
});
