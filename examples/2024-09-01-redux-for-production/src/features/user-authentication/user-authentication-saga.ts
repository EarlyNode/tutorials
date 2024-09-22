import { createAction } from '@reduxjs/toolkit';
import { call, put, takeLeading } from 'redux-saga/effects';

import { clear } from '@/redux/clear';

import { handleFetchCurrentUsersProfile } from '../user-profiles/user-profiles-saga';
import { loginRequest, logoutRequest } from './user-authentication-api';
import {
  login,
  loginSucceeded,
  name,
  stopAuthenticating,
} from './user-authentication-reducer';

function* handleLogin({
  payload: { email, password },
}: ReturnType<typeof login>) {
  try {
    const token: Awaited<ReturnType<typeof loginRequest>> = yield call(
      loginRequest,
      email,
      password,
    );
    yield put(loginSucceeded({ token }));
    yield call(handleFetchCurrentUsersProfile);
  } finally {
    yield put(stopAuthenticating());
  }
}

export function* watchLogin() {
  yield takeLeading(login.type, handleLogin);
}

export const logout = createAction(`${name}/logout`);

export function* handleLogout() {
  yield put(clear());
  yield call(logoutRequest);
}

export function* watchLogout() {
  yield takeLeading(logout.type, handleLogout);
}
