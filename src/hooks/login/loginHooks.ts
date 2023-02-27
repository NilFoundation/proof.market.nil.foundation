/**
 * @file React hook.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { useCallback, useMemo } from 'react';
import { notificationActions, Variant } from '@nilfoundation/react-components';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeItemFromLocalStorage, setItemIntoLocalStorage } from 'src/packages/LocalStorage';
import { selectUserName, SetJwtRevalidateTimeout, UpdateUserName, useAppSelector } from 'src/redux';
import { calculateRenewJwtTimeGap, getRuntimeConfigOrThrow, getUserFromJwt } from 'src/utils';
import { Path } from 'src/routing';

const readonlyUser = getRuntimeConfigOrThrow().READONLY_USER;

/**
 * Provides access to auth state.
 *
 * @returns Auth state.
 */
export const useAuth = (): {
    user: string | null;
    isAuthentificated: boolean;
    isReadonly: boolean;
} => {
    const user = useAppSelector(selectUserName);
    const isAuthentificated = useMemo(() => {
        return !!user;
    }, [user]);
    const isReadonly = useMemo(() => {
        return user === readonlyUser;
    }, [user]);

    return {
        user,
        isAuthentificated,
        isReadonly,
    };
};

/**
 * Returns callback to process login with jwt token.
 *
 * @param [redirectPath] Path to redirect user after success login.
 * @returns Login callback.
 */
export const useLogin = (redirectPath = Path.market): ((jwt: string) => void) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const processLogin = useCallback(
        (jwt: string) => {
            setItemIntoLocalStorage('jwt', jwt);

            const user = getUserFromJwt(jwt);
            const timeout = calculateRenewJwtTimeGap(jwt);

            user && dispatch(UpdateUserName(user));
            dispatch(SetJwtRevalidateTimeout(timeout));

            navigate(redirectPath, { replace: true });

            if (user === readonlyUser) {
                return;
            }

            notificationActions?.create({
                title: 'Login success',
                message: `Successfully login as ${user}`,
                variant: Variant.success,
            });
        },
        [dispatch, navigate, redirectPath],
    );

    return processLogin;
};

/**
 * Returns callback to logout with existed user.
 *
 * @returns Logout callback.
 */
export const useLogout = (): (() => void) => {
    const dispatch = useDispatch();

    const processLogout = useCallback(() => {
        dispatch(UpdateUserName(null));
        removeItemFromLocalStorage('jwt');
    }, [dispatch]);

    return processLogout;
};
