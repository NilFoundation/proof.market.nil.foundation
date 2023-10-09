/**
 * @file Overrides for StatementsList component.
 */

import { PRIMITIVE_COLORS } from '@nilfoundation/ui-kit';
import type { CardOverrides } from 'baseui/card';

/**
 * @returns Overrides for card.
 */
export const getCardOverrides = (): CardOverrides => ({
  Root: {
    style: {
      maxWidth: '100%',
      backgroundColor: PRIMITIVE_COLORS.gray900,
    },
  },
});
