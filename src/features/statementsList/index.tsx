/**
 * @file Public feature interfaces.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import loadable from '@loadable/component';
import { Spinner } from '@nilfoundation/react-components';

const StatementsList = loadable(() => import('./components/StatementsList'), {
  fallback: <Spinner grow />,
});

export { StatementsList };
