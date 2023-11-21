/**
 * @file Responsive styles.
 */

import type { StyleObject } from 'styletron-react';
import { lgScreenSize, mdScreenSize, smScreenSize, xlScreenSize } from './Breakpoint';

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
    getStyles(styles, `@media screen and (max-width: ${smScreenSize}px)`),
  md: (styles: StyleObject): StyleObject =>
    getStyles(
      styles,
      `@media screen and (min-width: ${smScreenSize + 1}) and (max-width: ${mdScreenSize})`,
    ),
  lg: (styles: StyleObject): StyleObject =>
    getStyles(
      styles,
      `@media screen and (min-width: ${mdScreenSize + 1}) and (max-width: ${lgScreenSize})`,
    ),
  xl: (styles: StyleObject): StyleObject =>
    getStyles(
      styles,
      `@media screen and (min-width: ${lgScreenSize + 1}) and (max-width: ${xlScreenSize})`,
    ),
  xxl: (styles: StyleObject): StyleObject =>
    getStyles(styles, `@media screen and (min-width: ${xlScreenSize + 1})`),
};
