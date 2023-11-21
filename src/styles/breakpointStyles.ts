/**
 * @file Responsive styles.
 */

import type { StyleObject } from 'styletron-react';
import { BREAKPOINT } from './Breakpoint';

const getStyles = (styles: StyleObject, query: string): StyleObject => ({
  [query]: styles,
});

/**
 * Get styles for breakpoint.
 *
 * @param styles - The styles to apply.
 * @returns The styles for breakpoint.
 */
export const breakpointStyles = {
  sm: (styles: StyleObject): StyleObject =>
    getStyles(styles, `@media screen and (max-width: ${BREAKPOINT.SM}px)`),
  md: (styles: StyleObject): StyleObject =>
    getStyles(
      styles,
      `@media screen and (min-width: ${BREAKPOINT.SM + 1}) and (max-width: ${BREAKPOINT.MD})`,
    ),
  lg: (styles: StyleObject): StyleObject =>
    getStyles(
      styles,
      `@media screen and (min-width: ${BREAKPOINT.MD + 1}) and (max-width: ${BREAKPOINT.LG})`,
    ),
  xl: (styles: StyleObject): StyleObject =>
    getStyles(
      styles,
      `@media screen and (min-width: ${BREAKPOINT.LG + 1}) and (max-width: ${BREAKPOINT.XL})`,
    ),
  xxl: (styles: StyleObject): StyleObject =>
    getStyles(styles, `@media screen and (min-width: ${BREAKPOINT.XL + 1})`),
};
