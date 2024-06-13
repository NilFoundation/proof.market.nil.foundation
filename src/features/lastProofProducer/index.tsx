/**
 * @file Exports public feature interfaces.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import loadable from '@loadable/component';
import { Spinner } from '@nilfoundation/ui-kit';

const LastProofProducerCard = loadable(() => import('./components/LastProofProducerCard'), {
  fallback: <Spinner animation />,
});

export { LastProofProducerCard };

export type { LastProofProducer } from './models/LastProofProducer';
