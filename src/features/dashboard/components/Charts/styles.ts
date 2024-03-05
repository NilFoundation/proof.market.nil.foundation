/**
 * @file Styles.
 */

import { SPACE } from '@nilfoundation/ui-kit';
import type { StyleObject } from 'styletron-react';

const chartContainer: StyleObject = {
  flexGrow: 1,
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
};

const wrapper: StyleObject = {
  flexGrow: 1,
  width: '100%',
};

const legend: StyleObject = {
  marginBottom: SPACE[8],
  height: '48px',
  flexShrink: 0,
};

const timeIntervalToggle: StyleObject = {
  marginBottom: SPACE[16],
};

export const styles = {
  legend,
  timeIntervalToggle,
  chartContainer,
  wrapper,
};
