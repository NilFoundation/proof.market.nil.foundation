/**
 * @file React hook.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { useCallback } from 'react';
import { dequal as deepEqual } from 'dequal';
import type { TableState } from 'react-table';
import type { LocalStorageKey } from '@/packages/LocalStorage';
import { useLocalStorage } from '../useLocalStorage';

/**
 * Partial table state.
 */
type PartalState<T extends Record<string, unknown>> = Partial<TableState<T>>;

/**
 * Hook to keep persisited react-table state between data updates.
 *
 * @param name Table name.
 * @param [defaultState] Default table state.
 * @returns Table state handlers.
 * InitialState is taken from localStorage and can be rewrited with setInitialState.
 */
export const useInitialTableState = <T extends Record<string, unknown>>(
    name: LocalStorageKey,
    defaultState: PartalState<T> = {},
): [PartalState<T>, (newState: PartalState<T>) => void] => {
    const [initialState, setInitialState] = useLocalStorage(name, defaultState);

    const setNewState = useCallback(
        (input: PartalState<T>) => {
            const { sortBy, filters, hiddenColumns, columnOrder, groupBy } = input;
            setInitialState({
                columnOrder,
                filters,
                hiddenColumns,
                sortBy,
                groupBy,
            });
        },
        [setInitialState],
    );

    const value = deepEqual(initialState, defaultState) ? defaultState : initialState;

    return [value, setNewState];
};
