/**
 * @file Public feature interfaces.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import loadable from '@loadable/component';
import { Spinner } from '@nilfoundation/ui-kit';

const TradeHistory = loadable(() => import('./components/TradeHistory'), {
  fallback: <Spinner animation />,
});

export { TradeHistory };
