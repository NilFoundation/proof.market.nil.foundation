/**
 * @file Styles.
 */

import { SPACE } from '@nilfoundation/ui-kit';
import type { StyleObject } from 'styletron-react';
import { globalStyles } from '@/styles/globalStyles';

const label: StyleObject = {
  textAlign: 'center',
  marginBottom: SPACE[12],
  ...globalStyles.textMuted,
};

const title: StyleObject = {
  textAlign: 'center',
  marginTop: 0,
};

const description: StyleObject = {
  marginTop: SPACE[48],
};

const control: StyleObject = {
  marginTop: SPACE[12],
};

const form: StyleObject = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const bottomBlock: StyleObject = {
  marginTop: 'auto',
};

const heading: StyleObject = {
  textAlign: 'center',
  margin: `${SPACE[16]} 0 ${SPACE[64]}`,
};

const errorMsg: StyleObject = {
  height: SPACE[48],
  display: 'flex',
  alignItems: 'center',
};

export const styles = {
  label,
  title,
  description,
  control,
  form,
  bottomBlock,
  heading,
  errorMsg,
};
