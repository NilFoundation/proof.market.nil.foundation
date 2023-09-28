/**
 * @file Global styles.
 */

import { PRIMITIVE_COLORS } from '@nilfoundation/ui-kit';
import type { StyleObject } from 'styletron-react';

const textMuted: StyleObject = {
  color: PRIMITIVE_COLORS.gray500,
};

const dangerText: StyleObject = {
  color: PRIMITIVE_COLORS.red300,
};

const successText: StyleObject = {
  color: PRIMITIVE_COLORS.green300,
};

export const globalStyles = {
  textMuted,
  dangerText,
  successText,
};
