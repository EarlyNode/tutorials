import { combineReducers } from '@reduxjs/toolkit';

import {
  name as appLoadingSliceName,
  reducer as appLoadingReducer,
} from '@/features/app-loading/app-loading-reducer';
import {
  reducer as postsReducer,
  reducerPath as postsSliceName,
} from '@/features/posts/posts-api';
import {
  name as userAuthenticationSliceName,
  reducer as userAuthenticationReducer,
} from '@/features/user-authentication/user-authentication-reducer';
import {
  name as userProfileSliceName,
  reducer as userProfileReducer,
} from '@/features/user-profiles/user-profiles-reducer';

export const rootReducer = combineReducers({
  [appLoadingSliceName]: appLoadingReducer,
  [postsSliceName]: postsReducer,
  [userAuthenticationSliceName]: userAuthenticationReducer,
  [userProfileSliceName]: userProfileReducer,
});
