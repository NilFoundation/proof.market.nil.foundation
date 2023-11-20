/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useRef, useState, useEffect } from 'react';
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
import { Path } from '@/features/routing';
import { login } from '@/api';
import { useLogin } from '@/features/auth';
import type { LoginData } from '@/models';
import { getApiErrorMessage } from '@/utils';
import { AuthCard } from '../AuthCard/AuthCard';
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
      await processLogin(jwt);
    } catch (e) {
      const internalErrorMsg = await getApiErrorMessage(e);

      let visibleErrorMsg = 'Login error';

      if (internalErrorMsg) {
        visibleErrorMsg += `: ${internalErrorMsg}`;
      }

      setErrorMessage(visibleErrorMsg);
    }
  });

  useEffect(() => {
    userNameInputRef.current && userNameInputRef.current.focus();
  }, []);

  const { ref, ...restRegister } = register('username', { required: true });

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
        <div>
          <Button
            variant={Variant.success}
            size={Size.lg}
            onClick={onSubmitLogin}
            disabled={!isValid || isSubmitting}
            block
          >
            Login
            {isSubmitting && <Spinner />}
          </Button>
        </div>
        <div className={styles.errorMsg}>
          <CSSTransition
            in={!!errorMessage}
            timeout={300}
            nodeRef={nodeRef}
            unmountOnExit
            classNames="fade"
          >
            <span
              ref={nodeRef}
              className="errorMessage"
            >
              {errorMessage}
            </span>
          </CSSTransition>
        </div>
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
