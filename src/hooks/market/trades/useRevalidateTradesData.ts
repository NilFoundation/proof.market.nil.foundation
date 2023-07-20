/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { useEffect, useRef } from 'react';
import type InfiniteLoader from 'react-window-infinite-loader';

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

    setInterval(() => {
        if (listRef.current && hasMountedRef.current) {
            console.log('here');
            listRef.current.resetloadMoreItemsCache();
        }
    }, 5000);

    return listRef;
};
