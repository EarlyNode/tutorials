import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from 'redux';
import logger from 'redux-logger';
import { thunk } from 'redux-thunk';

import {
  reducer as exampleReducer,
  slice as exampleSlice,
} from './example-reducer';
import {
  reducer as userProfileReducer,
  slice as userProfileSlice,
} from './user-profile';

const rootReducer = combineReducers({
  [exampleSlice]: exampleReducer,
  [userProfileSlice]: userProfileReducer,
});

export const makeStore = () => {
  return createStore(
    rootReducer,
    rootReducer(),
    applyMiddleware(thunk, logger),
  );
};
