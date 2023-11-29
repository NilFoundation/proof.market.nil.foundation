/**
 * @file Public feature interfaces.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import loadable from '@loadable/component';
import { Spinner } from '@nilfoundation/ui-kit';

const Dashboard = loadable(() => import('./components/Dashboard/Dashboard'), {
  fallback: <Spinner animation />,
});

export { Dashboard };
