import { createAction } from '@reduxjs/toolkit';
import { call, put, takeLeading } from 'redux-saga/effects';

import { handleFetchCurrentUsersProfile } from '@/features/user-profiles/user-profiles-saga';

import { finishedAppLoading, name } from './app-loading-reducer';

export const loadApp = createAction(`${name}/loadApp`);

function* handleLoadApp() {
  yield call(handleFetchCurrentUsersProfile);
  yield put(finishedAppLoading());
}

export function* watchLoadApp() {
  yield takeLeading(loadApp.type, handleLoadApp);
}
