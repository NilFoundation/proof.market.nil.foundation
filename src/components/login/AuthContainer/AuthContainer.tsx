/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement, ReactNode } from 'react';
import { Icon } from '@nilfoundation/react-components';
import { Link } from 'react-router-dom';
import { Copyright, FullScreenView } from '@/components';
import { Path } from '@/features/routing';
import { useBreakpoint } from '@/features/shared';
import styles from './AuthContainer.module.scss';

/**
 * Props.
 */
type AuthContainerProps = {
  children: ReactNode;
};

/**
 * Auth container.
 *
 * @param {AuthContainerProps} props Props.
 * @returns React component.
 */
export const AuthContainer = ({ children }: AuthContainerProps): ReactElement => {
  const bp = useBreakpoint();

  return (
    <FullScreenView
      showFullScreen
      className={styles.loginContainer}
    >
      {children}
      {bp === 'md' ||
        (bp === 'lg' && (
          <Link
            className={styles.back}
            to={Path.market}
          >
            <Icon iconName="fa-solid fa-chevron-left" />
            Back to Market
          </Link>
        ))}
      <div className={styles.copyright}>
        <Copyright />
      </div>
    </FullScreenView>
  );
};
