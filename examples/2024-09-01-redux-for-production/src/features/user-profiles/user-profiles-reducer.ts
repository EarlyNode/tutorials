import type { PayloadAction } from '@reduxjs/toolkit';
import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { complement, isNil, prop } from 'ramda';

import { clear } from '@/redux/clear';
import { RootState } from '@/redux/store';

import { UserProfile } from './user-profiles-types';

const userProfilesAdapter = createEntityAdapter<UserProfile>({
  sortComparer: (a, b) => a.email.localeCompare(b.email),
});

const initialState = userProfilesAdapter.getInitialState({
  currentUsersId: '',
  isLoading: true,
});

export const {
  actions: { currentUserProfileFetched, usersListFetched },
  name,
  reducer,
  selectSlice: selectUserProfileSlice,
  selectors: { selectCurrentUsersId, selectUserProfilesAreLoading },
} = createSlice({
  name: 'userProfiles',
  initialState,
  reducers: {
    currentUserProfileFetched: (
      state,
      { payload }: PayloadAction<UserProfile>,
    ) => {
      state.currentUsersId = payload.id;
      userProfilesAdapter.upsertOne(state, payload);
    },
    usersListFetched: (state, { payload }: PayloadAction<UserProfile[]>) => {
      userProfilesAdapter.setMany(state, payload);
      state.isLoading = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(clear, () => initialState);
  },
  selectors: {
    selectCurrentUsersId: prop<'currentUsersId'>('currentUsersId'),
    selectUserProfilesAreLoading: prop<'isLoading'>('isLoading'),
  },
});

const userProfileSelectors = userProfilesAdapter.getSelectors(
  selectUserProfileSlice,
);

const selectCurrentUsersProfile = (state: RootState) =>
  userProfileSelectors.selectById(state, selectCurrentUsersId(state));

export const selectCurrentUsersName = (state: RootState) =>
  selectCurrentUsersProfile(state)?.name || 'Anonymous';

export const selectIsAuthenticated = createSelector(
  selectCurrentUsersProfile,
  complement(isNil),
);

export const selectUsersList = userProfileSelectors.selectAll;
