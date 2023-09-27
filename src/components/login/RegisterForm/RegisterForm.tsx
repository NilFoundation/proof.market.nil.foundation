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
  Button,
  Variant,
  Form,
  Spinner,
  notificationActions,
} from '@nilfoundation/react-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import debounce from 'lodash/debounce';
import { useForm } from 'react-hook-form';
import { Path } from '@/features/routing';
import { socialLinks } from '@/constants';
import { SocialLinks } from '@/components';
import type { RegisterData } from '@/models';
import { signUp, checkIsUsernameUnique } from '@/api';
import { getApiErrorMessage } from '@/utils';
import { AuthCard } from '../AuthCard';
import styles from './RegisterForm.module.scss';

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

      notificationActions?.create({
        title: 'Registration success',
        message: `Successfully register new user ${data.user}`,
        variant: Variant.success,
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
      <Form className={styles.form}>
        <div>
          <h4 className={styles.title}>Welcome to Proof Market!</h4>
          <div className={`${styles.heading} text-muted`}>Create new account</div>
          <Form.Group hasError={!!errors['user'] || !userNameIsUnique}>
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
                      <Icon
                        iconName={`fa-solid ${pwdInputIconName}`}
                        className={styles.icon}
                      />
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
                block
                variant={Variant.success}
                size={Size.lg}
                disabled={isSubmitting || !isValid || !userNameIsUnique}
                onClick={onSubmitLogin}
              >
                Register
                {isSubmitting && <Spinner />}
              </Button>
            </div>
          </CSSTransition>
          <div className={styles.errorMsg}>
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
        <div className={styles.bottomBlock}>
          <div className={styles.social}>
            <h5 className={styles.title}>
              {"Join our Discord's proof-market channel/Telegram for questions/to stay updated"}
            </h5>
            <SocialLinks socialLinks={socialLinks} />
          </div>
          <h5 className="text-center text-muted">{'Already have an account? '}</h5>
          <Link
            to={Path.login}
            state={state}
          >
            <Button
              block
              variant={Variant.success}
              size={Size.lg}
            >
              Sign in
            </Button>
          </Link>
        </div>
      </Form>
    </AuthCard>
  );
};
