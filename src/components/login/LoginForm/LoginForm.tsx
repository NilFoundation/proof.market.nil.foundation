/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useCallback, useRef, useState, useEffect } from 'react';
import {
    Image,
    InputGroup,
    Icon,
    Input,
    Size,
    Button,
    Variant,
    Form,
    Spinner,
} from '@nilfoundation/react-components';
import { CSSTransition } from 'react-transition-group';
import { useForm } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom';
import type { TokenResponse } from '@react-oauth/google';
import { Path } from '@/routing';
import { login } from '@/api';
import { useLogin } from '@/hooks';
import type { LoginData } from '@/models';
import { AuthType } from '@/enums';
import { AuthCard } from '../AuthCard';
import { GoogleAuthButton } from '../GoolgeAuthButton';
import styles from './LoginForm.module.scss';

/**
 * Password input type.
 */
type PwdInputType = 'password' | 'text';

/**
 * Login form.
 *
 * @returns React component.
 */
export const LoginForm = (): ReactElement => {
    const nodeRef = useRef(null);
    const userNameInputRef = useRef<HTMLInputElement | null>(null);
    const { state } = useLocation();
    const processLogin = useLogin(state?.from);
    const [errorMessage, setErrorMessage] = useState<string>();
    const [pwdInputType, setPwdInputType] = useState<PwdInputType>('password');
    const pwdInputIconName = pwdInputType === 'password' ? 'fa-eye-slash' : 'fa-eye';
    const switchPwdInputType = () =>
        setPwdInputType(pwdInputType === 'password' ? 'text' : 'password');

    const {
        register,
        formState: { isSubmitting, isValid, errors },
        handleSubmit,
    } = useForm<LoginData>({
        mode: 'onChange',
    });

    const onSubmitLogin = handleSubmit(async (data: LoginData): Promise<void> => {
        setErrorMessage('');
        try {
            const { jwt } = await login(data);
            await processLogin(jwt, AuthType.credentials);
        } catch (e) {
            setErrorMessage('Login error');
        }
    });

    useEffect(() => {
        userNameInputRef.current && userNameInputRef.current.focus();
    }, []);

    const { ref, ...restRegister } = register('username', { required: true });

    const processGoogleLogin = useCallback(
        (r: TokenResponse) => {
            processLogin(r, AuthType.google, () => setErrorMessage('Login error'));
        },
        [processLogin],
    );
    const onErrorGoogleLogin = useCallback(() => setErrorMessage('Login error'), []);

    return (
        <AuthCard>
            <Image
                source="/logo512x384.png"
                alt="=nil; Foundation logo"
                responsive
                rounded
                className={styles.logoImage}
            />
            <Form>
                <Form.Group hasError={!!errors['username']}>
                    <InputGroup
                        size={Size.lg}
                        className={styles.control}
                    >
                        <InputGroup.Addon>
                            <Icon
                                iconName="fa-solid fa-user"
                                className={styles.icon}
                            />
                        </InputGroup.Addon>
                        <Input
                            type="text"
                            id="userName"
                            placeholder="username"
                            aria-label="username"
                            {...restRegister}
                            ref={e => {
                                ref(e);
                                userNameInputRef.current = e;
                            }}
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Group hasError={!!errors['password']}>
                    <InputGroup
                        size={Size.lg}
                        className={styles.control}
                    >
                        <InputGroup.Addon>
                            <Icon
                                iconName="fa-solid fa-lock"
                                className={styles.icon}
                            />
                        </InputGroup.Addon>
                        <Input
                            type={pwdInputType}
                            id="password"
                            aria-label="password"
                            placeholder="password"
                            autoComplete="off"
                            {...register('password')}
                        />
                        <InputGroup.Buttons>
                            <Button onClick={switchPwdInputType}>
                                <Icon
                                    iconName={`fa-solid ${pwdInputIconName}`}
                                    className={styles.icon}
                                />
                            </Button>
                        </InputGroup.Buttons>
                    </InputGroup>
                </Form.Group>
                <div className={styles.buttons}>
                    <Button
                        variant={Variant.success}
                        size={Size.lg}
                        onClick={onSubmitLogin}
                        disabled={!isValid || isSubmitting}
                    >
                        Login
                        {isSubmitting && <Spinner />}
                    </Button>
                    <GoogleAuthButton
                        onSuccess={processGoogleLogin}
                        onError={onErrorGoogleLogin}
                        disabled={isSubmitting}
                    />
                </div>
                <CSSTransition
                    classNames="fade"
                    timeout={300}
                    in={!!errorMessage}
                    unmountOnExit
                    nodeRef={nodeRef}
                >
                    <div
                        ref={nodeRef}
                        className="errorMessage"
                    >
                        {errorMessage}
                    </div>
                </CSSTransition>
                <h5 className="text-muted text-center">{"Don't have an account? "}</h5>
                <Link
                    to={Path.register}
                    state={state}
                >
                    <Button
                        block
                        variant={Variant.success}
                        size={Size.lg}
                        data-sb="submitLogin"
                    >
                        Sign up
                    </Button>
                </Link>
            </Form>
        </AuthCard>
    );
};
