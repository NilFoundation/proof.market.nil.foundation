/**
 * @file React hook.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { RefObject } from 'react';
import { useEffect } from 'react';

/**
 * Hook to manage click outside element.
 *
 * @param ref Ref.
 * @param closeHandler Close handler.
 */
export const useOnClickOutside = <T extends HTMLElement>(
  ref: RefObject<T>,
  closeHandler: () => void,
) => {
  useEffect(() => {
    const listener: EventListenerOrEventListenerObject = event => {
      const { current } = ref;

      if (current && event.target instanceof Node && !current.contains(event.target)) {
        if (!(event.target.nextSibling === ref.current)) {
          closeHandler();
        }
      }
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, closeHandler]);
};
