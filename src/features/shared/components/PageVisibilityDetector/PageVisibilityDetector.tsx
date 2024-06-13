/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useEffect } from 'react';
import { usePageVisibility } from 'react-page-visibility';
import { useDispatch } from 'react-redux';
import { SetPageIsVisible } from '@/redux';

/**
 * Headless component to handle user leaves/returns to page event.
 *
 * @returns .
 */
export const PageVisibilityDetector = (): ReactElement => {
  const isVisible = usePageVisibility();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SetPageIsVisible(isVisible));
  }, [isVisible, dispatch]);

  return <></>;
};
