/**
 * @file Breakpoints.
 */

export const smScreenSize = 768;
export const mdScreenSize = 992;
export const lgScreenSize = 1200;
export const xlScreenSize = 1600;

/**
 * Breakpoints.
 */
export const BREAKPOINT = {
  SM: smScreenSize,
  MD: mdScreenSize,
  LG: lgScreenSize,
  XL: xlScreenSize,
} as const;

Object.freeze(BREAKPOINT);
