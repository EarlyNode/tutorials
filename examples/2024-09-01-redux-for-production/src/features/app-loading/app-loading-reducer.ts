import { createSlice } from '@reduxjs/toolkit';
import { not, pipe, prop } from 'ramda';

const initialState = { appIsLoading: true };

export const {
  actions: { finishedAppLoading },
  name,
  reducer,
  selectors: { selectAppIsLoading },
} = createSlice({
  name: 'appLoading',
  initialState,
  reducers: {
    finishedAppLoading: state => {
      state.appIsLoading = false;
    },
  },
  selectors: {
    selectAppIsLoading: prop<'appIsLoading'>('appIsLoading'),
  },
});

/**
 * SELECTORS
 */

export const selectAppFinishedLoading = pipe(selectAppIsLoading, not);
