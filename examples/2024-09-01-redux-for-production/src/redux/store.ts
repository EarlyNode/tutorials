import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { middleware as postsMiddleware } from '@/features/posts/posts-api';

import { rootReducer } from './root-reducer';
import { rootSaga } from './root-saga';

export const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(sagaMiddleware, postsMiddleware),
  });
  sagaMiddleware.run(rootSaga);
  return store;
};

// Infer the type of makeStore's store.
export type AppStore = ReturnType<typeof makeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself.
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
