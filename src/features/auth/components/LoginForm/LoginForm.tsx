/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useRef, useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { BUTTON_KIND, Button, FormControl, Input, LabelMedium } from '@nilfoundation/ui-kit';
import { useForm } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom';
import { useStyletron } from 'styletron-react';
import { Path } from '@/features/routing';
import { login } from '@/api';
import { useLogin } from '@/features/auth';
import { getApiErrorMessage } from '@/utils';
import { AuthCard } from '../AuthCard/AuthCard';
import type { PwdInputType } from '../../models/PwdInputType';
import logoImge from '../../assets/logo512x384.png';
import type { LoginData } from '../../models/LoginData';
import { styles } from './styles';
import { getButtonOevrrides } from './overrides';

/**
 * Login form.
 *
 * @returns React component.
 */
export const LoginForm = (): ReactElement => {
  const [css] = useStyletron();
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
    <AuthCard img={logoImge}>
      <form>
        <FormControl>
          <Input
            id="userName"
            {...restRegister}
            placeholder="username"
            aria-label="username"
            type="text"
            error={!!errors['username']}
            ref={e => {
              ref(e);
              userNameInputRef.current = e;
            }}
          />
        </FormControl>
        <FormControl>
          <Input
            type={pwdInputType}
            id="password"
            aria-label="password"
            placeholder="password"
            autoComplete="off"
            error={!!errors['password']}
            endEnhancer={<Button onClick={switchPwdInputType}></Button>}
            {...register('password')}
          />
        </FormControl>
        <div>
          <Button
            data-sb="submitLogin"
            kind={BUTTON_KIND.primary}
            onClick={onSubmitLogin}
            disabled={!isValid || isSubmitting}
            overrides={getButtonOevrrides()}
            isLoading={isSubmitting}
          >
            Login
          </Button>
        </div>
        <div className={css(styles.errorMsg)}>
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
        <LabelMedium className={css(styles.label)}>{"Don't have an account?"}</LabelMedium>
        <Link
          to={Path.register}
          state={state}
        >
          <Button
            data-sb="submitLogin"
            kind={BUTTON_KIND.primary}
            overrides={getButtonOevrrides()}
          >
            Sign up
          </Button>
        </Link>
      </form>
    </AuthCard>
  );
};
