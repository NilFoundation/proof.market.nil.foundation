/**
 * @file React hook.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { useEffect, useState } from 'react';

/**
 * Hook to use debounce inside react component.
 * Debounces set state, preventing unnecessary rerender.
 *
 * @param value Value.
 * @param delay Delay.
 * @returns Debounced value.
 */
export const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
