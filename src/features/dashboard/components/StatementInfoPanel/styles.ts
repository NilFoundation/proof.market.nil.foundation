/**
 * @file Styles for Trades component.
 */

import type { StyleObject } from 'styletron-react';
import { globalStyles } from '@/styles/globalStyles';

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
};

export const styles = {
  container,
  infoContainer,
  title,
};
