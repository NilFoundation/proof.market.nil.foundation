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
export const enum BREAKPOINT {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  XXL = 'xxl',
}

/**
 * Breakpoint size map.
 */
export const breakpointSizeMap = new Map<BREAKPOINT, number>([
  [BREAKPOINT.SM, smScreenSize],
  [BREAKPOINT.MD, mdScreenSize],
  [BREAKPOINT.LG, lgScreenSize],
  [BREAKPOINT.XL, xlScreenSize],
  [BREAKPOINT.XXL, Number.MAX_SAFE_INTEGER],
]);
