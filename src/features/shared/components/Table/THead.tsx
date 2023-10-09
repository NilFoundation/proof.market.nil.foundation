/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { DetailedHTMLProps, HTMLAttributes, ReactElement } from 'react';
import clsx from 'clsx';
import styles from './Table.module.scss';

/**
 * Props.
 */
type THeadProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  sticky?: boolean;
  isFooterHeader?: boolean;
};

/**
 * Table head.
 *
 * @param {THeadProps} props Props.
 * @returns React component.
 */
export const THead = ({
  sticky,
  className,
  children,
  isFooterHeader,
  ...rest
}: THeadProps): ReactElement => {
  const tHeadClassName = clsx(
    styles.tableHead,
    className,
    sticky && styles.stickyHead,
    isFooterHeader && styles.footerHead,
  );

  return (
    <div
      role="rowgroup"
      className={tHeadClassName}
      {...rest}
    >
      {children}
    </div>
  );
};
