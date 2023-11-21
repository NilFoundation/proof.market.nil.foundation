/**
 * @file Styles for NotificationsContainer component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { SPACE } from '@nilfoundation/ui-kit';
import type { StyleObject } from 'styletron-react';

const container: StyleObject = {
  zIndex: 1000,
  overflow: 'hidden',
  position: 'fixed',
  bottom: 0,
  right: 0,
  display: 'flex',
  flexFlow: 'column nowrap',
  alignItems: 'flex-end',
  gap: SPACE[16],
};

export const styles = {
  container,
};
