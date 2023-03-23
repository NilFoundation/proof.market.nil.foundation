/**
 * @file React functional component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import type { UseGoogleLoginOptionsImplicitFlow } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
import type { ButtonProps } from '@nilfoundation/react-components';
import { Button, Icon, Size, Variant } from '@nilfoundation/react-components';
import styles from './GoogleAuthButton.module.scss';

/**
 * Props.
 */
type GoogleAuthButtonProps = Pick<UseGoogleLoginOptionsImplicitFlow, 'onError' | 'onSuccess'> &
    Omit<ButtonProps<HTMLButtonElement>, 'onClick' | 'size' | 'variant'>;

/**
 * Google auth button.
 *
 * @param {GoogleAuthButtonProps} props Props.
 * @returns React component.
 */
export const GoogleAuthButton = ({
    onError,
    onSuccess,
    className,
    ...rest
}: GoogleAuthButtonProps): ReactElement => {
    const login = useGoogleLogin({
        onSuccess: tokenResponse => {
            onSuccess && onSuccess(tokenResponse);
        },
        onError: errorResponse => {
            onError && onError(errorResponse);
        },
    });

    return (
        <Button
            className={`${styles.button} ${className ?? ''}`}
            onClick={() => login()}
            size={Size.lg}
            variant={Variant.primary}
            {...rest}
        >
            <Icon iconName="fa-brands fa-google" />
            Google
        </Button>
    );
};
