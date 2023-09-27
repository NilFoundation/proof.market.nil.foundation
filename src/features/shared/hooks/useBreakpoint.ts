/**
 * @file React hook.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { useEffect, useState } from 'react';
import { useWindowDimensions } from './useWindowDimensions';

type Breakpoint = 'sm' | 'md' | 'lg';

/**
 * Hook to get current breakpoint based on screen width.
 *
 * @returns Matched breakpoint.
 */
export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>();
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width < 768) {
      setBreakpoint('sm');
      return;
    }

    if (width >= 1400) {
      setBreakpoint('lg');
      return;
    }

    setBreakpoint('md');
  }, [width]);

  return breakpoint;
};
