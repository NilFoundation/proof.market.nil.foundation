/**
 * @file React functional component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement, ReactNode } from 'react';
import { Card } from '@nilfoundation/ui-kit';
import { getCardOverrides } from './overrides';

/**
 * Props.
 */
type AuthCardProps = {
  children: ReactNode;
  img?: string;
};

/**
 * Auth card template.
 *
 * @param {AuthCardProps} props - Props.
 * @returns React component.
 */
export const AuthCard = ({ children, img }: AuthCardProps): ReactElement => {
  return (
    <Card
      border
      headline
      overrides={getCardOverrides()}
      headerImage={img}
    >
      {children}
    </Card>
  );
};
