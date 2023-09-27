/**
 * @file Reducer.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { createReducer } from '@reduxjs/toolkit';
import type { LastProofProducer } from '@/models';
import {
  UpdateIsErrorLastProofProducer,
  UpdateIsLoadingLastProofProducer,
  UpdateLastProofProducer,
} from '../actions';

/**
 * State.
 */
export type LastProofProducerReducerState = {
  data?: Array<LastProofProducer | null>;
  isLoading: boolean;
  isError: boolean;
};

/**
 * Initial state.
 */
const initialState: LastProofProducerReducerState = {
  data: undefined,
  isLoading: false,
  isError: false,
};

/**
 * Reducer of last proof producer data.
 */
export const LastProofProducerReducer = createReducer(initialState, builder =>
  builder
    .addCase(UpdateLastProofProducer, (state, { payload }) => {
      state.data = payload;
    })
    .addCase(UpdateIsErrorLastProofProducer, (state, { payload }) => {
      state.isError = payload;
    })
    .addCase(UpdateIsLoadingLastProofProducer, (state, { payload }) => {
      state.isLoading = payload;
    }),
);
