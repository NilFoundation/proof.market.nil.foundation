/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useRef, useState } from 'react';
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
  const { state } = useLocation();
  const processLogin = useLogin(state?.from);
  const [errorMessage, setErrorMessage] = useState<string>();

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

  return (
    <AuthCard img={logoImge}>
      <form>
        <FormControl>
          <Input
            id="userName"
            {...register('username', { required: true })}
            placeholder="username"
            aria-label="username"
            type="text"
            error={!!errors['username']}
            min={0}
            max={30}
          />
        </FormControl>
        <FormControl>
          <Input
            type="password"
            id="password"
            aria-label="password"
            placeholder="password"
            autoComplete="off"
            error={!!errors['password']}
            {...register('password')}
            min={0}
            max={30}
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
