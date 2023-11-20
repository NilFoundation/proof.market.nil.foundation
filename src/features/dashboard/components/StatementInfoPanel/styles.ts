/**
 * @file Styles for Trades component.
 */

import type { StyleObject } from 'styletron-react';
import { globalStyles } from '@/styles/globalStyles';
import { SPACE } from '@nilfoundation/ui-kit';

const container: StyleObject = {
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
};

const title: StyleObject = {
  ...globalStyles.textMuted,
  fontSize: '1.5rem',
  whiteSpace: 'nowrap',
};

const infoContainer: StyleObject = {
  display: 'flex',
  justifyContent: 'flex-start',
  gap: SPACE[16],
};

export const styles = {
  container,
  infoContainer,
  title,
};
