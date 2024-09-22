import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { prop } from 'ramda';

import { clear } from '@/redux/clear';

const initialState = { isAuthenticating: false, token: '' };

export const {
  actions: { login, loginSucceeded, stopAuthenticating },
  name,
  reducer,
  selectors: { selectIsAuthenticating, selectAuthenticationToken },
} = createSlice({
  name: 'userAuthentication',
  initialState,
  reducers: {
    login: (
      state,
      { payload }: PayloadAction<{ email: string; password: string }>,
    ) => {
      state.isAuthenticating = true;
    },
    loginSucceeded: (state, { payload }: PayloadAction<{ token: string }>) => {
      state.token = payload.token;
    },
    stopAuthenticating: state => {
      state.isAuthenticating = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(clear, () => initialState);
  },
  selectors: {
    selectIsAuthenticating: prop<'isAuthenticating'>('isAuthenticating'),
    selectAuthenticationToken: prop<'token'>('token'),
  },
});
