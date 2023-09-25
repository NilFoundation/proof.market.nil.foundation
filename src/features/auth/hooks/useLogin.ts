/**
 * @file React hook.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { useCallback } from 'react';
import { notificationActions, Variant } from '@nilfoundation/react-components';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SetJwtRevalidateTimeout, UpdateIsAuthorized, UpdateUserName } from '@/redux';
import { calculateRenewJwtTimeGap, getRuntimeConfigOrThrow, getUserFromJwt } from '@/utils';
import { Path } from '@/features/routing';
import { setItemIntoLocalStorage } from '@/packages/LocalStorage';

const readonlyUser = getRuntimeConfigOrThrow().READONLY_USER;

/**
 * Returns callback to process login with jwt token.
 *
 * @param [redirectPath] Path to redirect user after success login.
 * @returns Login callback.
 */
export const useLogin = (redirectPath = Path.market) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const processCredentialsLogin = useCallback(
        async (jwt: string) => {
            setItemIntoLocalStorage('userToken', jwt);

            const user = getUserFromJwt(jwt);
            const timeout = calculateRenewJwtTimeGap(jwt);

            dispatch(SetJwtRevalidateTimeout(timeout));

            return user;
        },
        [dispatch],
    );

    const processLogin = useCallback(
        async (data: string, errorCb?: () => void) => {
            try {
                const user = await processCredentialsLogin(data);

                if (!user) {
                    return;
                }

                navigate(redirectPath, { replace: true });

                dispatch(UpdateUserName(user));
                dispatch(UpdateIsAuthorized(true));

                if (user === readonlyUser) {
                    return;
                }

                notificationActions?.create({
                    title: 'Login success',
                    message: `Successfully login as ${user}`,
                    variant: Variant.success,
                });
            } catch {
                errorCb && errorCb();
            }
        },
        [processCredentialsLogin, navigate, redirectPath, dispatch],
    );

    return processLogin;
};
