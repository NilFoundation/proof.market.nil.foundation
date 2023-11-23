/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useStyletron } from 'styletron-react';
import { ArrowUpIcon } from '@nilfoundation/ui-kit';
import { Path } from '@/features/routing';
import { Copyright, useBreakpoint } from '@/features/shared';
import { BREAKPOINT } from '@/styles/Breakpoint';
import { styles } from './styles';

/**
 * Auth container.
 *
 * @returns React component.
 */
const AuthContainer = (): ReactElement => {
  const bp = useBreakpoint();
  const [css] = useStyletron();

  return (
    <div className={css(styles.container)}>
      <Outlet />
      {bp === BREAKPOINT.MD ||
        (bp === BREAKPOINT.LG && (
          <Link
            className={css(styles.back)}
            to={Path.market}
          >
            <ArrowUpIcon className={css(styles.icon)} />
            Back to Market
          </Link>
        ))}
      <Copyright className={css(styles.copyright)} />
    </div>
  );
};

export default AuthContainer;
