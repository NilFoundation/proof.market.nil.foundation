/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { LabelMedium } from '@nilfoundation/ui-kit';

/**
 * Copyright text.
 *
 * @returns React component.
 */
export const Copyright = (): ReactElement => {
  return <LabelMedium>{`Copyright © =nil; Foundation ${new Date().getFullYear()}`}</LabelMedium>;
};
