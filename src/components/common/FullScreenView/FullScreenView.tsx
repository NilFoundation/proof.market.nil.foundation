/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactNode } from 'react';
import { useRef } from 'react';
import { Portal } from '@nilfoundation/react-components';
import { CSSTransition } from 'react-transition-group';
import styles from './FullScreenView.module.scss';

/**
 * Props.
 */
type FullScreenViewProps = {
  showFullScreen: boolean;
  children: ReactNode;
  className?: string;
};

/**
 * Full screen view container.
 *
 * @param {FullScreenViewProps} props Props.
 * @returns React component.
 */
export const FullScreenView = ({
  showFullScreen,
  children,
  className,
}: FullScreenViewProps): JSX.Element => {
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {!showFullScreen && children}
      <Portal>
        <CSSTransition
          classNames="alert"
          timeout={300}
          in={showFullScreen}
          nodeRef={nodeRef}
          unmountOnExit
        >
          <div
            className={`${styles.fullScreenView} ${className ?? ''}`}
            ref={nodeRef}
          >
            {children}
          </div>
        </CSSTransition>
      </Portal>
    </>
  );
};
