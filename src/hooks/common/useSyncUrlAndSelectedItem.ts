/**
 * @file React hook.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { dequal as deepEqual } from 'dequal';
import type { EqualityFn, NoInfer } from 'react-redux';
import { useDispatch } from 'react-redux';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import type { RootStateType } from '@/redux';
import { useAppSelector } from '@/redux';
import type { RouterParam } from '@/enums';

/**
 * Hook settings.
 */
type UseSyncUrlAndSelectedItemSettings<T extends { _key: string; name: string }> = {
    urlParamToSync: RouterParam;
    actionToUpdateSelectedItem: ActionCreatorWithPayload<string>;
    itemSelector: (state: RootStateType) => T | undefined;
    allItemsSelector: (state: RootStateType) => T[];
    itemSelectorEqualityFunction?: EqualityFn<NoInfer<T | undefined>>;
};

/**
 * Hook to sync selected item and site url.
 *
 * @param {UseSyncUrlAndSelectedItemSettings} settings Hook settings.
 */
export const useSyncUrlAndSelectedItem = <T extends { _key: string; name: string }>({
    actionToUpdateSelectedItem,
    itemSelector,
    allItemsSelector,
    urlParamToSync,
    itemSelectorEqualityFunction = (prev, next) => prev?._key === next?._key,
}: UseSyncUrlAndSelectedItemSettings<T>): void => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const selectedItem = useAppSelector(itemSelector, itemSelectorEqualityFunction);
    const allItems = useAppSelector(allItemsSelector, deepEqual);
    const nameFromUrlParam = useParams()[urlParamToSync];

    const navigateToItem = useCallback(
        (item?: T) => {
            item !== undefined && navigate(`${item.name}`, { relative: 'route' });
        },
        [navigate],
    );

    useEffect(() => {
        if (nameFromUrlParam !== undefined) {
            const itemToSelect = allItems.find(x => x.name === nameFromUrlParam);

            if (itemToSelect) {
                dispatch(actionToUpdateSelectedItem(itemToSelect._key));
            } else {
                const firstAvialiableStatement = allItems.at(0);
                firstAvialiableStatement &&
                    dispatch(actionToUpdateSelectedItem(firstAvialiableStatement._key));
                navigateToItem(firstAvialiableStatement);
            }

            return;
        }

        navigateToItem(selectedItem);
    }, [
        dispatch,
        selectedItem,
        allItems,
        navigateToItem,
        actionToUpdateSelectedItem,
        nameFromUrlParam,
    ]);
};

// user opens emty page
// user opens page with url parameters
// user opens page with parameters and filters
