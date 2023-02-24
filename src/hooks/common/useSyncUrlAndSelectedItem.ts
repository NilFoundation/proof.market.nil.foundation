/**
 * @file React hook.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { EqualityFn, NoInfer } from 'react-redux';
import { useDispatch } from 'react-redux';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import type { RootStateType } from 'src/redux';
import { useAppSelector } from 'src/redux';
import type { RouterParam } from 'src/enums';

/**
 * Hook settings.
 */
type UseSyncUrlAndSelectedItemSettings<T> = {
    urlParamToSync: RouterParam;
    actionToUpdateSelectedItem: ActionCreatorWithPayload<string>;
    itemSelector: (state: RootStateType) => T;
    selectorEqualityFunction?: EqualityFn<NoInfer<T>>;
};

/**
 * Hook to sync selected item and site url.
 *
 * @param {UseSyncUrlAndSelectedItemSettings} settings Hook settings.
 */
export const useSyncUrlAndSelectedItem = <T>({
    actionToUpdateSelectedItem,
    itemSelector,
    urlParamToSync,
    selectorEqualityFunction,
}: UseSyncUrlAndSelectedItemSettings<T>): void => {
    const dispatch = useDispatch();
    const selectedItem = useAppSelector(itemSelector, selectorEqualityFunction);
    const paramToSync = useParams()[urlParamToSync];
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedItem === paramToSync) {
            return;
        }

        if (paramToSync !== undefined) {
            dispatch(actionToUpdateSelectedItem(paramToSync));
            return;
        }

        selectedItem !== undefined && navigate(`${selectedItem}`, { relative: 'path' });
    }, [paramToSync, dispatch, selectedItem, navigate, actionToUpdateSelectedItem]);
};
