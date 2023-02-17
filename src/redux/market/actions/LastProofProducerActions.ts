/**
 * @file Redux action creators.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createAction } from '@reduxjs/toolkit';
import type { LastProofProducer } from 'src/models';

/**
 * Update last proof producer data.
 */
export const UpdateLastProofProducer = createAction<Array<LastProofProducer | null> | undefined>(
    '@lastProofProducer/UPDATE_DATA',
);

/**
 * Update loading last proof producer data state.
 */
export const UpdateIsLoadingLastProofProducer = createAction<boolean>(
    '@lastProofProducer/UPDATE_IS_LOADING',
);

/**
 * Update getting last proof producer data error state.
 */
export const UpdateIsErrorLastProofProducer = createAction<boolean>(
    '@lastProofProducer/UPDATE_IS_ERROR',
);
