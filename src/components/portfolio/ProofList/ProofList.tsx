/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { Spinner } from '@nilfoundation/react-components';
import type { ListChildComponentProps } from 'react-window';
import { VirtualList } from 'src/components/common';
import type { PortfolioRequestsInfo, Proof } from 'src/models';
import { useInfiniteLoadProofs, useWindowHeight } from 'src/hooks';
import { ProofListItem } from './ProofListItem';
import styles from './ProofList.module.scss';

/**
 * Props.
 */
type ProofListProps = {
    selectedRequestsInfoKey: PortfolioRequestsInfo['_key'];
};

/**
 * Proof list.
 *
 * @param {ProofListProps} props Props.
 * @returns React component.
 */
export const ProofList = ({ selectedRequestsInfoKey }: ProofListProps): ReactElement => {
    const windowHeight = useWindowHeight();
    const listHeight = useMemo(() => windowHeight - 274, [windowHeight]);
    const { items, loadMoreItems, loading, hasMore, error } = useInfiniteLoadProofs({
        selectedRequestsInfoKey,
    });

    const isItemLoaded = (index: number) => !hasMore || !!items.at(index);
    const itemCount = hasMore ? items.length + 1 : items.length;

    const Element = ({ index, style }: ListChildComponentProps<Proof>) => {
        const styleWithMargin = {
            ...style,
            top: `${parseFloat(style.top as string) + 12 * (index + 1)}px`,
        };

        if (!isItemLoaded(index)) {
            return (
                <div style={styleWithMargin}>
                    <Spinner grow />
                </div>
            );
        }

        const currentItem = items.at(index)!;

        return (
            <ProofListItem
                proof={currentItem}
                style={styleWithMargin}
            />
        );
    };

    return (
        <div className={styles.container}>
            {!loading && error && items.length === 0 && <h5>Error while getting proofs data.</h5>}
            {!loading && !error && items.length === 0 && <h5>No proofs found.</h5>}
            <VirtualList
                isItemLoaded={isItemLoaded}
                itemCount={itemCount}
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                loadMoreItems={loading ? () => {} : loadMoreItems}
                height={listHeight}
                itemSize={164}
                className={styles.virtualList}
            >
                {Element}
            </VirtualList>
        </div>
    );
};
