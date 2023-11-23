/**
 * @file Overrides for Login card component.
 */

import type { ButtonOverrides } from 'baseui/button';

/**
 * @returns Overrides for button.
 */
export const getButtonOevrrides = (): ButtonOverrides => ({
  BaseButton: {
    style: {
      width: '100%',
    },
  },
});
