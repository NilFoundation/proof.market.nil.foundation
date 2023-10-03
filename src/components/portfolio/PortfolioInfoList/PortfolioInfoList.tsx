/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { ListGroup, Spinner } from '@nilfoundation/react-components';
import { P, match } from 'ts-pattern';
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
  return (
    <DashboardCard>
      <h4>{title}</h4>
      <div className={styles.container}>
        <PortfolioInfoListViewFactory
          items={items}
          isLoadingItems={isLoadingItems}
          getItemsError={isError}
          itemsLinksSubPath={itemsLinksSubPath}
        />
      </div>
    </DashboardCard>
  );
};

const PortfolioInfoListViewFactory = <T extends { _key: string; name: string }>({
  items,
  isLoadingItems,
  getItemsError,
  itemsLinksSubPath,
}: {
  items: T[];
  isLoadingItems: boolean;
  getItemsError: boolean;
  itemsLinksSubPath: Path;
}) => {
  return match([isLoadingItems, getItemsError, items])
    .with([true, false, []], () => <Spinner grow />)
    .with([false, true, []], () => <h5>Error while getting statements info.</h5>)
    .with([false, false, []], () => <h5>No statements found.</h5>)
    .with([false, false, P.array({ _key: P.string })], () => (
      <ListGroup className={styles.list}>
        {items.map(({ name, _key }) => (
          <PortfolioInfoListItem
            name={name}
            key={_key}
            path={`${Path.portfolio}/${itemsLinksSubPath}/${name}`}
          />
        ))}
      </ListGroup>
    ))
    .otherwise(() => <></>);
};
