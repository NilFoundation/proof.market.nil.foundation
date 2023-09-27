/**
 * @file Footer component styles.
 */

import type { StyleObject } from 'styletron-react';

const container: StyleObject = {
  height: '100%',
  display: 'flex',
  flexFlow: 'column nowrap',
  alignItems: 'center',
  marginTop: '100px',
};

const title: StyleObject = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: '20px',
};

export const styles = {
  container,
  title,
};
