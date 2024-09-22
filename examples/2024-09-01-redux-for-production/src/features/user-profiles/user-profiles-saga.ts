import { createAction } from '@reduxjs/toolkit';
import { call, put, select, takeLeading } from 'redux-saga/effects';

import { selectAuthenticationToken } from '../user-authentication/user-authentication-reducer';
import {
  currentUserProfileFetched,
  name,
  usersListFetched,
} from '../user-profiles/user-profiles-reducer';
import { getCurrentUserRequest, getUsersRequest } from './user-profiles-api';

export function* handleFetchCurrentUsersProfile() {
  const token: ReturnType<typeof selectAuthenticationToken> = yield select(
    selectAuthenticationToken,
  );
  const user: Awaited<ReturnType<typeof getCurrentUserRequest>> = yield call(
    getCurrentUserRequest,
    token,
  );

  if (user) {
    yield put(currentUserProfileFetched(user));
  }
}

function* handleFetchUserProfiles() {
  const token: ReturnType<typeof selectAuthenticationToken> = yield select(
    selectAuthenticationToken,
  );
  const users: Awaited<ReturnType<typeof getUsersRequest>> = yield call(
    getUsersRequest,
    token,
  );

  yield put(usersListFetched(users));
}

export const fetchUserProfiles = createAction(`${name}/fetchUserProfiles`);

export function* watchFetchUserProfiles() {
  yield takeLeading(fetchUserProfiles.type, handleFetchUserProfiles);
}
