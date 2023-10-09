/**
 * @file Exports public feature interfaces.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import loadable from '@loadable/component';
import { Spinner } from '@nilfoundation/ui-kit';

const LastProofProducer = loadable(() => import('./components/LastProofProducer'), {
  fallback: <Spinner animation />,
});

export { LastProofProducer };
