/**
 * @file React hook.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { useEffect, useState } from 'react';

function getWindowHeight() {
    const { innerHeight: height } = window;
    return height;
}

/**
 * Hook to get window height.
 *
 * @returns Window height.
 */
export const useWindowHeight = () => {
    const [windowHeight, setWindowHeight] = useState(getWindowHeight());

    useEffect(() => {
        function handleResize() {
            setWindowHeight(getWindowHeight());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowHeight;
};
