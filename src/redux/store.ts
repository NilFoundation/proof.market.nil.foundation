/**
 * @file State.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import type { Middleware } from '@reduxjs/toolkit';
import { RootReducer } from './rootReducer';
import RootSaga from './RootSaga';

const sagaMiddleware = createSagaMiddleware();
const middlewares: Middleware[] = [sagaMiddleware];

export const store = configureStore({
    reducer: RootReducer,
    middleware: getDefaultMiddleware => [...getDefaultMiddleware({ thunk: false }), ...middlewares],
    devTools: import.meta.env.DEV,
});

sagaMiddleware.run(RootSaga);
