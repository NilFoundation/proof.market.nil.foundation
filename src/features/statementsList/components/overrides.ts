/**
 * @file Overrides for StatementsList component.
 */

import { PRIMITIVE_COLORS } from '@nilfoundation/ui-kit';
import type { CardOverrides } from 'baseui/card';
import type { InputOverrides } from 'baseui/input';
import type { SelectOverrides } from 'baseui/select';

/**
 * @returns Overrides for text filter.
 */
export const getTextFilterOverrides = (): InputOverrides => ({
  Root: {
    style: {
      marginBottom: '0.75rem',
    },
  },
});

/**
 * @returns Overrides for statements card.
 */
export const getStatementsCardOverrides = (): CardOverrides => ({
  Root: {
    style: {
      maxWidth: '100%',
      backgroundColor: PRIMITIVE_COLORS.gray900,
    },
  },
});

/**
 * @returns Overrides for select.
 */
export const getSelectOverrides = (): SelectOverrides => ({
  Root: {
    style: {
      marginBottom: '0.75rem',
    },
  },
});
