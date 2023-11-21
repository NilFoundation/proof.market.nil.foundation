/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactNode, ReactElement } from 'react';
import { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

/**
 * Portal props.
 */
export type PortalProps = {
  children: ReactNode;
  selector?: string;
};

/**
 * Create portal JSX helper.
 *
 * @param {PortalProps} props - Props.
 * @returns React component.
 */
export const Portal = ({ children, selector = 'popup' }: PortalProps): ReactElement | null => {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<Element | null>(null);

  useEffect(() => {
    ref.current = document.querySelector(selector) || document.body;
    setMounted(true);
  }, [selector]);

  return mounted ? createPortal(children, ref.current!) : null;
};
