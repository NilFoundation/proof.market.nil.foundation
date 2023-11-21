/**
 * @file Styles for hiding scrollbar.
 */

import type { StyleObject } from 'styletron-react';

export const hideScrollbar: StyleObject = {
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '::-webkit-scrollbar': {
    display: 'none',
  },
};
