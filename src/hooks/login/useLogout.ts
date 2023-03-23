/**
 * @file React hook.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { googleLogout } from '@react-oauth/google';
import {
    selectAuthType,
    UpdateAuthType,
    UpdateIsAuthorized,
    UpdateUserName,
    useAppSelector,
} from '@/redux';
import { AuthType } from '@/enums';
import { clearAuthLocalStorageState } from '@/utils';

/**
 * Returns callback to logout existed user.
 *
 * @returns Logout callback.
 */
export const useLogout = (): (() => void) => {
    const dispatch = useDispatch();
    const authType = useAppSelector(selectAuthType);

    const processLogout = useCallback(() => {
        dispatch(UpdateUserName(null));
        dispatch(UpdateAuthType(undefined));
        dispatch(UpdateIsAuthorized(false));

        if (authType === AuthType.credentials) {
            googleLogout();
        }

        clearAuthLocalStorageState();
    }, [dispatch, authType]);

    return processLogout;
};
