/**
 * @file React hook.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 *
 * Credits to https://usehooks.com/useLocalStorage/
 */

import { useCallback, useState } from 'react';
import { dequal as deepEqual } from 'dequal';
import { getItemFromLocalStorage, setItemIntoLocalStorage } from 'src/packages/LocalStorage';

/**
 * Hook to use localStorage in a useState() hook way.
 *
 * @param key LocalStorage key.
 * @param initialValue Inital value. Used when localStorage is empty.
 * @returns Persisited state.
 */
export const useLocalStorage = <T extends unknown>(
    key: string,
    initialValue: T,
): [T, (value: T) => void] => {
    const [storedValue, setStoredValue] = useState<T>(
        () => getItemFromLocalStorage(key) ?? initialValue,
    );

    const setValue = useCallback(
        (value: T) => {
            if (deepEqual(storedValue, value)) {
                return;
            }

            setStoredValue(value);
            setItemIntoLocalStorage(key, value);
        },
        [key, storedValue],
    );

    return [storedValue, setValue];
};
