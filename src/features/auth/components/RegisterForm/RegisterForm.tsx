/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useRef, useState, useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import debounce from 'lodash/debounce';
import { useForm } from 'react-hook-form';
import {
  BUTTON_KIND,
  Button,
  FormControl,
  Input,
  LabelMedium,
  NOTIFICATION_KIND,
  ParagraphMedium,
} from '@nilfoundation/ui-kit';
import { useStyletron } from 'styletron-react';
import { Path } from '@/features/routing';
import { socialLinks } from '@/constants';
import { SocialLinks } from '@/features/shared';
import { signUp, checkIsUsernameUnique } from '@/api';
import { getApiErrorMessage } from '@/utils';
import { notificationActions } from '@/features/notifications';
import { AuthCard } from '../AuthCard/AuthCard';
import type { RegisterData } from '../../models/RegisterData';
import { getButtonOevrrides } from './overrides';
import { styles } from './styles';

/**
 * Register form.
 *
 * @returns React component.
 */
export const RegisterForm = (): ReactElement => {
  const usernameRequiredMinLength = 3;
  const usernameAndPwdMaxLength = 30;
  const [css] = useStyletron();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [userNameIsUnique, setUserNameIsUnique] = useState(true);
  const { state } = useLocation();
  const inputAnimationRef = useRef(null);
  const buttonAnimationRef = useRef(null);
  const errorMsgAnimationRef = useRef(null);
  const navigate = useNavigate();
  const {
    handleSubmit,
    watch,
    register,
    formState: { isSubmitting, errors, isValid, dirtyFields },
  } = useForm<RegisterData>({ mode: 'onChange' });

  const onSubmitLogin = handleSubmit(async (data: RegisterData): Promise<void> => {
    setErrorMessage('');
    try {
      await signUp(data);

      notificationActions.create({
        message: `Successfully register new user ${data.user}`,
        kind: NOTIFICATION_KIND.positive,
      });

      navigate(Path.login, { state });
    } catch (e) {
      const internalErrorMsg = await getApiErrorMessage(e);

      let visibleErrorMsg = 'Register error';

      if (internalErrorMsg) {
        visibleErrorMsg += `: ${internalErrorMsg}`;
      }

      setErrorMessage(visibleErrorMsg);
    }
  });

  const showPasswdInput = useMemo(() => !!dirtyFields.user, [dirtyFields.user]);
  const showSubmitButton = useMemo(() => !!dirtyFields.passwd, [dirtyFields.passwd]);

  const debouncedCheckIsUsernameUnique = useRef(
    debounce(async (name?: string) => {
      if (!name) {
        return;
      }

      try {
        await checkIsUsernameUnique(name);
        setUserNameIsUnique(false);
      } catch (e) {
        if (e?.response?.status === 404) {
          setUserNameIsUnique(true);
        }
      }
    }, 180),
  ).current;

  const userInputValue = watch('user');
  useEffect(() => {
    debouncedCheckIsUsernameUnique(userInputValue);
  }, [userInputValue, debouncedCheckIsUsernameUnique]);

  return (
    <AuthCard>
      <form className={css(styles.form)}>
        <div>
          <h4 className={css(styles.title)}>Welcome to Proof Market!</h4>
          <div className={`${styles.heading} text-muted`}>Create new account</div>
          <FormControl error={!!errors['user']}>
            <Input
              type="text"
              id="userName"
              placeholder="username"
              aria-label="username"
              {...register('user', {
                required: true,
                minLength: usernameRequiredMinLength,
                maxLength: usernameAndPwdMaxLength,
              })}
              min={0}
              max={usernameAndPwdMaxLength}
            />
          </FormControl>
          <CSSTransition
            classNames="fade"
            timeout={300}
            in={showPasswdInput}
            unmountOnExit
            nodeRef={inputAnimationRef}
          >
            <div ref={inputAnimationRef}>
              <FormControl error={!!errors['passwd']}>
                <Input
                  type="password"
                  id="password"
                  aria-label="password"
                  placeholder="password"
                  autoComplete="off"
                  {...register('passwd', {
                    required: true,
                    maxLength: usernameAndPwdMaxLength,
                  })}
                  min={0}
                  max={usernameAndPwdMaxLength}
                />
              </FormControl>
            </div>
          </CSSTransition>
          <CSSTransition
            classNames="fade"
            timeout={300}
            in={showSubmitButton}
            unmountOnExit
            nodeRef={buttonAnimationRef}
          >
            <div ref={buttonAnimationRef}>
              <Button
                kind={BUTTON_KIND.primary}
                overrides={getButtonOevrrides()}
                disabled={isSubmitting || !isValid || !userNameIsUnique}
                onClick={onSubmitLogin}
                isLoading={isSubmitting}
              >
                Register
              </Button>
            </div>
          </CSSTransition>
          <div className={css(styles.errorMsg)}>
            <CSSTransition
              in={!!errorMessage}
              timeout={300}
              nodeRef={errorMsgAnimationRef}
              unmountOnExit
              classNames="fade"
            >
              <span
                ref={errorMsgAnimationRef}
                className="errorMessage"
              >
                {errorMessage}
              </span>
            </CSSTransition>
          </div>
        </div>
        <div className={css(styles.bottomBlock)}>
          <div>
            <ParagraphMedium className={css(styles.title)}>
              {"Join our Discord's proof-market channel/Telegram for questions/to stay updated"}
            </ParagraphMedium>
            <SocialLinks socialLinks={socialLinks} />
          </div>
          <LabelMedium className={css(styles.label)}>{'Already have an account? '}</LabelMedium>
          <Link
            to={Path.login}
            state={state}
          >
            <Button
              kind={BUTTON_KIND.primary}
              overrides={getButtonOevrrides()}
            >
              Sign in
            </Button>
          </Link>
        </div>
      </form>
    </AuthCard>
  );
};
