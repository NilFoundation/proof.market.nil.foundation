/**
 * @file Overrides for Auth card component.
 */

import { SPACE } from '@nilfoundation/ui-kit';
import type { CardOverrides } from 'baseui/card';
import { expandProperty } from 'inline-style-expand-shorthand';
import { breakpointStyles } from '@/styles/breakpointStyles';

/**
 * @returns Overrides for card.
 */
export const getCardOverrides = (): CardOverrides => ({
  Root: {
    style: {
      maxWidth: '360px',
      ...expandProperty('padding', SPACE[24]),
      ...breakpointStyles.sm({
        maxWidth: '100%',
        height: '100vh',
        ...expandProperty('padding', SPACE[16]),
      }),
    },
  },
});
