/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement, ReactNode } from 'react';
import styles from './Overlay.module.scss';

/**
 * Props.
 */
type OverlayProps = {
  className?: string;
  children: ReactNode;
};

/**
 * Overlay component.
 *
 * @param {OverlayProps} props Props.
 * @returns React component.
 */
export const Overlay = ({ className, children }: OverlayProps): ReactElement => (
  <div className={`${className ?? ''} ${styles.overlay}`}>{children}</div>
);
