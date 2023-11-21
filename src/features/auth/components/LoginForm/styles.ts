/**
 * @file Styles.
 */

import type { StyleObject } from 'styletron-react';
import { SPACE } from '@nilfoundation/ui-kit';
import { globalStyles } from '@/styles/globalStyles';

const label: StyleObject = {
  textAlign: 'center',
  marginBottom: SPACE[12],
  ...globalStyles.textMuted,
};

const errorMsg: StyleObject = {
  ...globalStyles.dangerText,
  display: 'flex',
  alignItems: 'center',
  height: '3rem',
};

export const styles = {
  label,
  errorMsg,
};
