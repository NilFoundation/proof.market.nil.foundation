/**
 * @file Styles for PriceChangeIndicator component.
 */

import type { StyleObject } from 'styletron-react';

const revertedIcon: StyleObject = {
  transform: 'rotate(180deg)',
};

const container: StyleObject = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
};

export const styles = {
  revertedIcon,
  container,
};
