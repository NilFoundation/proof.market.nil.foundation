/**
 * @file Public feature interfaces.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import loadable from '@loadable/component';
import { Spinner } from '@nilfoundation/ui-kit';

const StatementInfoPanel = loadable(
  () => import('./components/StatementInfoPanel/StatementInfoPanel'),
  {
    fallback: <Spinner animation />,
  },
);

export { StatementInfoPanel };
