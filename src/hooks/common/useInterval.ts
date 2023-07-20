/**
 * @file React hook.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 *
 * Credits https://usehooks-ts.com/react-hook/use-interval
 */

import { useEffect, useRef, useLayoutEffect } from 'react';

/**
 * @param callback Callback to run.
 * @param delay Delay between intervals.
 */
export function useInterval(callback: () => void, delay = 0) {
    const savedCallback = useRef(callback);

    useLayoutEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        if (!delay && delay !== 0) {
            return;
        }

        const id = setInterval(() => savedCallback.current(), delay);

        return () => clearInterval(id);
    }, [delay]);
}
