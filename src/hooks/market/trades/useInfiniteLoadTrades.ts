/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { useCallback, useState, useRef } from 'react';
import { getProposals } from '@/api';
import type { Proposal } from '@/models';

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
};

/**
 * Hook to manage infinite loading trades.
 *
 * @param {UseInfiniteLoadItemsParams} params Params.
 * @returns .
 */
export const useInfiniteLoadTrades = ({
    selectedStatementKey,
}: UseInfiniteLoadItemsParams): UseInfiniteLoadItemsReturnType => {
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

    const loadMoreItems = useCallback(
        async (startIndex: number, stopIndex: number) => {
            stopIndex += 1;
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

                const getTradesApiFilter: Partial<Proposal> = {
                    statement_key: selectedStatementKey,
                    status: 'completed',
                };

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
        [setError, setLoading, loadedItemsState, selectedStatementKey],
    );

    return {
        items: loadedItemsState.items.sort(sortTradesByUpdatedOnTimeDesc),
        loading,
        error,
        loadMoreItems,
        hasMore: loadedItemsState.hasNextPage,
    };
};

function sortTradesByUpdatedOnTimeDesc(a: Proposal, b: Proposal) {
    if (!a.updatedOn || !b.updatedOn) {
        return 0;
    }

    return b.updatedOn - a.updatedOn;
}
