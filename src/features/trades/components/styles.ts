/**
 * @file Styles for Trades component.
 */

import type { StyleObject } from 'styletron-react';
import { hideScrollbar } from '@/styles/hideScrollbar';

const list: StyleObject = { ...hideScrollbar };

const container: StyleObject = {};

export const styles = {
  list,
  container,
};
