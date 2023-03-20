/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { useCallback, useState, useRef } from 'react';
import { getProofs } from '@/api';
import type { PortfolioRequestsInfo, Proof } from '@/models';

/**
 * Hook parameters type.
 */
type UseInfiniteLoadItemsParams = {
    selectedRequestsInfoKey: PortfolioRequestsInfo['_key'];
};

/**
 * Hook return type.
 */
type UseInfiniteLoadItemsReturnType = {
    items: Proof[];
    loading: boolean;
    error: boolean;
    loadMoreItems: (startIndex: number, stopIndex: number) => Promise<void>;
    hasMore: boolean;
};

/**
 * Hook to manage infinite loading proofs.
 *
 * @param {UseInfiniteLoadItemsParams} params Params.
 * @returns .
 */
export const useInfiniteLoadProofs = ({
    selectedRequestsInfoKey,
}: UseInfiniteLoadItemsParams): UseInfiniteLoadItemsReturnType => {
    const requestCache = useRef<Record<string, boolean>>({});
    const [loadedItemsState, setLoadedItemsState] = useState<{
        hasNextPage: boolean;
        items: Proof[];
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

                const getProofsParameters: Partial<Proof> = {
                    statement_key: selectedRequestsInfoKey,
                };

                const loadedItems = await getProofs(getProofsParameters, stopIndex, startIndex);

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
        [setError, setLoading, loadedItemsState, selectedRequestsInfoKey],
    );

    return {
        items: loadedItemsState.items,
        loading,
        error,
        loadMoreItems,
        hasMore: loadedItemsState.hasNextPage,
    };
};
