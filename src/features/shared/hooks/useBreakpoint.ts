/**
 * @file React hook.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { useEffect, useState } from 'react';
import {
  smScreenSize,
  mdScreenSize,
  lgScreenSize,
  xlScreenSize,
  BREAKPOINT,
} from '@/styles/Breakpoint';
import { useWindowDimensions } from './useWindowDimensions';

/**
 * Hook to get current breakpoint based on screen width.
 *
 * @returns Matched breakpoint.
 */
export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<BREAKPOINT>();
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width <= smScreenSize) {
      setBreakpoint(BREAKPOINT.SM);
      return;
    }

    if (width > smScreenSize && width <= mdScreenSize) {
      setBreakpoint(BREAKPOINT.MD);
      return;
    }

    if (width > mdScreenSize && width <= lgScreenSize) {
      setBreakpoint(BREAKPOINT.LG);
      return;
    }

    if (width > lgScreenSize && width <= xlScreenSize) {
      setBreakpoint(BREAKPOINT.XL);
      return;
    }

    if (width > xlScreenSize) {
      setBreakpoint(BREAKPOINT.XXL);
      return;
    }
  }, [width]);

  return breakpoint;
};
