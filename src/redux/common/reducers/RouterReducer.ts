/**
 * @file Reducer.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { createReducer } from '@reduxjs/toolkit';
import type { Location, Params } from 'react-router-dom';
import { SetLocation, SetParams } from '../actions';

/**
 * State.
 */
export type RouterReducerState = {
  location: Location | null;
  params: Readonly<Params<string>> | null;
};

/**
 * Initial state.
 */
const initialState: RouterReducerState = {
  location: null,
  params: null,
};

/**
 * Reducer of router state.
 */
export const RouterReducer = createReducer(initialState, builder =>
  builder
    .addCase(SetLocation, (state, { payload }) => {
      state.location = payload;
    })
    .addCase(SetParams, (state, { payload }) => {
      state.params = payload;
    }),
);
