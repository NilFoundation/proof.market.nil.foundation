/**
 * @file Styles.
 */

import type { StyleObject } from 'styletron-react';
import { SPACE } from '@nilfoundation/ui-kit';
import { breakpointStyles } from '@/styles/breakpointStyles';

const container: StyleObject = {
  backgroundColor: '$c-base',
  paddingTop: SPACE[64],
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  ...breakpointStyles.sm({
    backgroundColor: '$c-base-darker',
    paddingTop: SPACE[32],
  }),
};

const back: StyleObject = {
  position: 'absolute',
  left: '10%',
  top: SPACE[64],
  fontSize: '1.75rem',
};

const icon: StyleObject = {
  marginRight: SPACE[16],
  transform: 'rotate(-90deg)',
};

const copyright: StyleObject = {
  marginTop: 'auto',
  marginBottom: SPACE[64],
};

export const styles = {
  container,
  back,
  icon,
  copyright,
};
