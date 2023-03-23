/**
 * @file React hook.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { useCallback } from 'react';
import { notificationActions, Variant } from '@nilfoundation/react-components';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { TokenResponse } from '@react-oauth/google';
import {
    SetJwtRevalidateTimeout,
    UpdateAuthType,
    UpdateGoogleUserInfo,
    UpdateIsAuthorized,
    UpdateUserName,
} from '@/redux';
import { calculateRenewJwtTimeGap, getRuntimeConfigOrThrow, getUserFromJwt } from '@/utils';
import { Path } from '@/routing';
import { AuthType } from '@/enums';
import { getGoogleProfileInfo } from '@/api';
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

    const processGoogleLogin = useCallback(
        async ({ access_token }: TokenResponse, errorCb?: () => void) => {
            try {
                const response = await getGoogleProfileInfo(access_token);

                dispatch(UpdateGoogleUserInfo(response));

                setItemIntoLocalStorage('userToken', access_token);

                // TODO - add google token revalidation

                return response.name;
            } catch {
                errorCb && errorCb();
            }
        },
        [dispatch],
    );

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
        async (
            data: string | TokenResponse,
            authType: AuthType = AuthType.credentials,
            errorCb?: () => void,
        ) => {
            const user =
                authType === AuthType.credentials
                    ? await processCredentialsLogin(data as string)
                    : await processGoogleLogin(data as TokenResponse, errorCb);

            if (!user) {
                return;
            }

            setItemIntoLocalStorage('authType', authType);

            navigate(redirectPath, { replace: true });

            dispatch(UpdateAuthType(authType));
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
        },
        [processCredentialsLogin, processGoogleLogin, navigate, redirectPath, dispatch],
    );

    return processLogin;
};
