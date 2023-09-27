/**
 * @file React functional component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStyletron } from 'styletron-react';
import { BUTTON_KIND, Button } from '@nilfoundation/ui-kit';
import { Path } from '@/features/routing';
import { useAuth } from '@/features/auth';
import { Overlay } from '@/components/common';
import { styles as s } from './styles';

/**
 * Props.
 */
type ProtectedComponentProps = {
  children: ReactNode;
  overlayTitle?: string;
  overlayButtonText?: string;
};

/**
 * Component to restrict non-authorized and readonly users access.
 * Renders an overlay with a link to login page.
 *
 * @param {ProtectedComponentProps} props - Props.
 * @returns React component.
 */
export const ProtectedContent = ({
  children,
  overlayTitle,
  overlayButtonText = 'Sign in',
}: ProtectedComponentProps): ReactElement => {
  const { isAuthorized, isReadonly } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [css] = useStyletron();

  return (
    <>
      {(!isAuthorized || isReadonly) && (
        <Overlay>
          <div className={css(s.container)}>
            {overlayTitle && <div className={css(s.title)}>{overlayTitle}</div>}
            <Button
              kind={BUTTON_KIND.primary}
              onClick={() => navigate(Path.login, { state: { from: pathname } })}
            >
              {overlayButtonText}
            </Button>
          </div>
        </Overlay>
      )}
      {children}
    </>
  );
};
