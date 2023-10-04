/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { DetailedHTMLProps, HTMLAttributes, ReactElement } from 'react';
import styles from './Table.module.scss';

/**
 * Props.
 */
type TableProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

/**
 * Table.
 *
 * @param {TableProps} props Props.
 * @returns React component.
 */
export const Table = ({ className, children, ...rest }: TableProps): ReactElement => {
  return (
    <div
      role="table"
      className={`${styles.table} ${className ?? ''}`}
      {...rest}
    >
      {children}
    </div>
  );
};
