import { call, put, takeLeading } from 'redux-saga/effects';

import { fetchUserById, fetchUsers } from './user-profile-api';
import {
  fetchedUsers,
  loginClicked,
  loginSucceeded,
} from './user-profile-reducer';

function* handleLoginClicked({ payload: { id, router } }) {
  const user = yield call(fetchUserById, id);
  yield put(loginSucceeded(user));
  const users = yield call(fetchUsers);
  yield put(fetchedUsers(users));
  yield call(router.push, '/dashboard');
}

export function* watchHandleLoginClicked() {
  yield takeLeading(loginClicked().type, handleLoginClicked);
}
