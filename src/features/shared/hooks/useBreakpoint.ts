/**
 * @file React hook.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { useEffect, useState } from 'react';
import { useWindowDimensions } from './useWindowDimensions';

type Breakpoint = 'sm' | 'md' | 'lg';

/**
 * Hook to get window dimensions.
 *
 * @returns Window dimwnsions.
 */
export const useBreakpoint = () => {
    const [breakpoint, setBreakpoint] = useState<Breakpoint>();
    const { width } = useWindowDimensions();

    useEffect(() => {
        if (width < 768) {
            setBreakpoint('sm');
        }

        if (width >= 1400) {
            setBreakpoint('lg');
        }

        setBreakpoint('md');
    }, [width]);

    return breakpoint;
};
