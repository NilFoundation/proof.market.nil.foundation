/**
 * @file Public feature interfaces.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import loadable from '@loadable/component';
import { Spinner } from '@nilfoundation/ui-kit';

const StatementsList = loadable(() => import('./components/StatementsList'), {
  fallback: <Spinner animation />,
});

export { StatementsList };
