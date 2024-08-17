import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { reducer as exampleReducer, slice as exampleSlice } from './example';
import {
  reducer as userProfileReducer,
  slice as userProfileSlice,
} from './user-profile';

const rootReducer = combineReducers({
  [exampleSlice]: exampleReducer,
  [userProfileSlice]: userProfileReducer,
});

export const makeStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk, logger));
};

const setCurrentUser = payload => ({ type: 'SET_CURRENT_USER', payload }); // 🚫 Bad!
const loginSuccess = payload => ({ type: 'LOGIN_SUCCESS', payload }); // ✅ Good!
const changeUser = payload => ({ type: 'changeUser', payload }); // ✅ Good!

const changeCurrentUser = (state, currentUser) => ({
  ...state,
  currentUserId: currentUser.id,
  users: { ...state.users, [currentUser.id]: currentUser },
});

export const reducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case setCurrentUser().type: {
      return changeUser(state, payload);
    }
    case changeUser().type: {
      return changeUser(state, payload);
    }
    case loginSuccess().type: {
      return changeCurrentUser(state, payload);
    }
    // ... rest
  }
};
