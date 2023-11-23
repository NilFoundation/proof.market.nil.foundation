/**
 * @file React hook.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 *
 * Credits to https://usehooks.com/useLocalStorage/
 */

import { useCallback, useState } from 'react';
import { dequal as deepEqual } from 'dequal';
import type { LocalStorageKey } from '@/packages/localStorage';
import { LocalStorageAPI } from '@/packages/localStorage';

/**
 * Hook to use localStorage in a useState() hook way.
 *
 * @param key LocalStorage key.
 * @param initialValue Inital value. Used when localStorage is empty.
 * @returns Persisited state.
 */
export const useLocalStorage = <T,>(
  key: LocalStorageKey,
  initialValue: T,
): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(
    () => LocalStorageAPI.getItem(key) ?? initialValue,
  );

  const setValue = useCallback(
    (value: T) => {
      if (deepEqual(storedValue, value)) {
        return;
      }

      setStoredValue(value);
      LocalStorageAPI.setItem(key, value);
    },
    [key, storedValue],
  );

  return [storedValue, setValue];
};
