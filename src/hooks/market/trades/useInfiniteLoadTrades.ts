/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { RefObject } from 'react';
import { useCallback, useState, useRef, useMemo } from 'react';
import type InfiniteLoader from 'react-window-infinite-loader';
import { getProposals } from '@/api';
import type { Proposal } from '@/models';
import { useInterval } from '@/hooks/common';
import { getRuntimeConfigOrThrow } from '@/utils';

/**
 * Hook parameters type.
 */
type UseInfiniteLoadItemsParams = {
    selectedStatementKey: string;
};

/**
 * Hook return type.
 */
type UseInfiniteLoadItemsReturnType = {
    items: Proposal[];
    loading: boolean;
    error: boolean;
    loadMoreItems: (startIndex: number, stopIndex: number) => Promise<void>;
    hasMore: boolean;
    listRef: RefObject<InfiniteLoader>;
};

let lastStopIndexCache = 0;

const { REVALIDATE_DATA_INTERVAL } = getRuntimeConfigOrThrow();

/**
 * Hook to manage infinite loading trades.
 *
 * @param {UseInfiniteLoadItemsParams} params Params.
 * @returns .
 */
export const useInfiniteLoadTrades = ({
    selectedStatementKey,
}: UseInfiniteLoadItemsParams): UseInfiniteLoadItemsReturnType => {
    const listRef = useRef<InfiniteLoader>(null);
    const requestCache = useRef<Record<string, boolean>>({});
    const [loadedItemsState, setLoadedItemsState] = useState<{
        hasNextPage: boolean;
        items: Proposal[];
    }>({
        hasNextPage: true,
        items: [],
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const items = useMemo(
        () => loadedItemsState.items.sort(sortTradesByUpdatedOnTimeDesc),
        [loadedItemsState.items],
    );

    const getTradesApiFilter: Partial<Proposal> = useMemo(
        () => ({
            statement_key: selectedStatementKey,
            status: 'completed',
        }),
        [selectedStatementKey],
    );

    useInterval(async () => {
        try {
            const revalidatedItems = await getProposals(getTradesApiFilter, lastStopIndexCache, 0);

            if (loading) {
                return;
            }

            const { items, hasNextPage } = loadedItemsState;
            const shouldRevalidate = items.at(0) !== revalidatedItems.at(0);

            if (shouldRevalidate) {
                if (listRef.current) {
                    listRef.current.resetloadMoreItemsCache(true);
                }

                setLoadedItemsState({
                    hasNextPage,
                    items: revalidatedItems.slice(0, items.length),
                });
            }
        } catch {
            setError(true);
        }
    }, Number(REVALIDATE_DATA_INTERVAL));

    const loadMoreItems = useCallback(
        async (startIndex: number, stopIndex: number) => {
            stopIndex += 1;
            lastStopIndexCache = stopIndex;

            const { items } = loadedItemsState;

            const key = `${startIndex}:${stopIndex}`;

            if (requestCache.current[key]) {
                return;
            }

            const length = stopIndex - startIndex;
            const visibleRange = [...Array(length).keys()].map(x => x + startIndex);
            const itemsRetreived = visibleRange.every(index => !!items.at(index));

            if (itemsRetreived) {
                requestCache.current[key] = true;
                return;
            }

            try {
                setLoading(true);
                setError(false);

                const loadedItems = await getProposals(getTradesApiFilter, stopIndex, startIndex);

                setLoading(false);
                setLoadedItemsState({
                    hasNextPage: loadedItems.length >= length,
                    items: [...items].concat(loadedItems),
                });
            } catch {
                setError(true);
                setLoading(false);
            }
        },
        [loadedItemsState, getTradesApiFilter],
    );

    return {
        items,
        loading,
        error,
        loadMoreItems,
        hasMore: loadedItemsState.hasNextPage,
        listRef,
    };
};

function sortTradesByUpdatedOnTimeDesc(a: Proposal, b: Proposal) {
    if (!a.updatedOn || !b.updatedOn) {
        return 0;
    }

    return b.updatedOn - a.updatedOn;
}
