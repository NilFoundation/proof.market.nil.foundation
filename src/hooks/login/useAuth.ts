/**
 * @file React hook.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { useMemo } from 'react';
import { selectAuthType, selectIsAuthenticated, selectUserName, useAppSelector } from '@/redux';
import { getRuntimeConfigOrThrow } from '@/utils';
import type { AuthType } from '@/enums';

const readonlyUser = getRuntimeConfigOrThrow().READONLY_USER;

/**
 * Provides access to auth state.
 *
 * @returns Auth state.
 */
export const useAuth = (): {
    user: string | null;
    isAuthenticated: boolean;
    isReadonly: boolean;
    authType?: AuthType;
} => {
    const user = useAppSelector(selectUserName);
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const authType = useAppSelector(selectAuthType);
    const isReadonly = useMemo(() => {
        return user === readonlyUser;
    }, [user]);

    return {
        user,
        isAuthenticated,
        isReadonly,
        authType,
    };
};
