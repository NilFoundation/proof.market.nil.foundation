/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { LabelMedium } from '@nilfoundation/ui-kit';

type CopyrightProps = {
  className?: string;
};

/**
 * Copyright text.
 *
 * @param {CopyrightProps} props Props.
 * @returns React component.
 */
export const Copyright = ({ className }: CopyrightProps): ReactElement => {
  return (
    <LabelMedium
      className={className}
    >{`Copyright © =nil; Foundation ${new Date().getFullYear()}`}</LabelMedium>
  );
};
