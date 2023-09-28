/**
 * @file Styles for SocialLinks component.
 */

import { PRIMITIVE_COLORS } from '@nilfoundation/ui-kit';
import type { StyleObject } from 'styletron-react';

const container = (bottomIndent?: boolean): StyleObject => ({
  listStyle: 'none',
  paddingInlineStart: 0,
  display: 'flex',
  justifyContent: 'center',
  marginBottom: bottomIndent ? '2rem' : 0,
});

const item: StyleObject = {
  padding: '4px 0',
  width: '50px',
  textAlign: 'center',
};

const link: StyleObject = {
  color: PRIMITIVE_COLORS.gray300,
  transition: 'color 0.1s ease',
  fontSize: '32px',
  ':hover': {
    color: PRIMITIVE_COLORS.gray200,
  },
};

export const styles = {
  container,
  item,
  link,
};
