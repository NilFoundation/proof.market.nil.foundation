/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { useEffect, useRef } from 'react';
import type InfiniteLoader from 'react-window-infinite-loader';
import { useInterval } from '@/hooks';
import { getRuntimeConfigOrThrow } from '@/utils';

const { REVALIDATE_DATA_INTERVAL } = getRuntimeConfigOrThrow();

/**
 * Revalidate infinite loader data.
 *
 * @returns Ref.
 */
export const useRevalidateTradesData = () => {
    const listRef = useRef<InfiniteLoader>(null);
    const hasMountedRef = useRef(false);

    useEffect(() => {
        hasMountedRef.current = true;
    }, []);

    useInterval(() => {
        if (listRef.current && hasMountedRef.current) {
            console.log('here');
            listRef.current.resetloadMoreItemsCache(true);
        }
    }, Number(REVALIDATE_DATA_INTERVAL));

    return listRef;
};
