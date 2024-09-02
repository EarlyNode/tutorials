import { combineReducers } from 'redux';

import {
  reducer as exampleReducer,
  slice as exampleSlice,
} from '../../features/example/example-reducer';
import {
  reducer as userProfileReducer,
  slice as userProfileSlice,
} from '../../features/user-profiles/user-profile-reducer';

export const rootReducer = combineReducers({
  [exampleSlice]: exampleReducer,
  [userProfileSlice]: userProfileReducer,
});
