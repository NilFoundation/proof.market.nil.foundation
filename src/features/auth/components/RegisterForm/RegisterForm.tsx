/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useRef, useState, useEffect, useMemo } from 'react';
import {
  InputGroup,
  Icon,
  Input,
  Size,
  Variant,
  Form,
  Spinner,
} from '@nilfoundation/react-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import debounce from 'lodash/debounce';
import { useForm } from 'react-hook-form';
import {
  BUTTON_KIND,
  Button,
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

const usernameRequiredMinLength = 3;
const usernameAndPwdMaxLength = 30;

/**
 * Password input type.
 */
type PwdInputType = 'password' | 'text';

/**
 * Register form.
 *
 * @returns React component.
 */
export const RegisterForm = (): ReactElement => {
  const [css] = useStyletron();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [userNameIsUnique, setUserNameIsUnique] = useState(true);
  const { state } = useLocation();
  const [pwdInputType, setPwdInputType] = useState<PwdInputType>('password');
  const pwdInputIconName = pwdInputType === 'password' ? 'fa-eye-slash' : 'fa-eye';
  const switchPwdInputType = () =>
    setPwdInputType(pwdInputType === 'password' ? 'text' : 'password');

  const inputAnimationRef = useRef(null);
  const buttonAnimationRef = useRef(null);
  const errorMsgAnimationRef = useRef(null);
  const userNameInputRef = useRef<HTMLInputElement | null>(null);
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

  useEffect(() => {
    userNameInputRef.current && userNameInputRef.current.focus();
  }, []);

  const { ref, ...restRegister } = register('user', {
    required: true,
    minLength: usernameRequiredMinLength,
    maxLength: usernameAndPwdMaxLength,
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
      <Form className={css(styles.form)}>
        <div>
          <h4 className={css(styles.title)}>Welcome to Proof Market!</h4>
          <div className={`${styles.heading} text-muted`}>Create new account</div>
          <Form.Group hasError={!!errors['user'] || !userNameIsUnique}>
            <InputGroup
              size={Size.lg}
              className={css(styles.control)}
            >
              <InputGroup.Addon>
                <Icon iconName="fa-solid fa-user" />
              </InputGroup.Addon>
              <Input
                type="text"
                id="userName"
                placeholder="username"
                aria-label="username"
                ref={e => {
                  ref(e);
                  userNameInputRef.current = e;
                }}
                {...restRegister}
              />
            </InputGroup>
            {!userNameIsUnique && <Form.Hint>Username should be unique</Form.Hint>}
          </Form.Group>
          <CSSTransition
            classNames="fade"
            timeout={300}
            in={showPasswdInput}
            unmountOnExit
            nodeRef={inputAnimationRef}
          >
            <div ref={inputAnimationRef}>
              <Form.Group hasError={!!errors['passwd']}>
                <InputGroup
                  size={Size.lg}
                  className={css(styles.control)}
                >
                  <InputGroup.Addon>
                    <Icon iconName="fa-solid fa-lock" />
                  </InputGroup.Addon>
                  <Input
                    type={pwdInputType}
                    id="password"
                    placeholder="password"
                    aria-label="password"
                    autoComplete="off"
                    {...register('passwd', {
                      required: true,
                      maxLength: usernameAndPwdMaxLength,
                    })}
                  />
                  <InputGroup.Buttons>
                    <Button onClick={switchPwdInputType}>
                      <Icon iconName={`fa-solid ${pwdInputIconName}`} />
                    </Button>
                  </InputGroup.Buttons>
                </InputGroup>
              </Form.Group>
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
      </Form>
    </AuthCard>
  );
};
