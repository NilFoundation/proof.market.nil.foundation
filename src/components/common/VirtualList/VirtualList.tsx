/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { forwardRef } from 'react';
import type { FixedSizeListProps } from 'react-window';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

/**
 * Props.
 */
type VirtualListProps = {
    isItemLoaded: (i: number) => boolean;
    loadMoreItems: (startIndex: number, stopIndex: number) => Promise<void> | void;
} & Pick<FixedSizeListProps, 'itemSize' | 'className' | 'children' | 'height' | 'itemCount'>;

/**
 * Vertical virtual list.
 *
 * @param {VirtualListProps} props Props.
 * @returns React component.
 */
export const VirtualList = forwardRef<InfiniteLoader, VirtualListProps>(function VirtualList(
    { isItemLoaded, children, loadMoreItems, itemCount, ...rest },
    ref,
): ReactElement {
    return (
        <InfiniteLoader
            loadMoreItems={loadMoreItems}
            itemCount={itemCount}
            isItemLoaded={isItemLoaded}
            ref={ref}
        >
            {({ onItemsRendered, ref }) => (
                <List
                    itemCount={itemCount}
                    onItemsRendered={onItemsRendered}
                    ref={ref}
                    width="100%"
                    {...rest}
                >
                    {children}
                </List>
            )}
        </InfiniteLoader>
    );
});
