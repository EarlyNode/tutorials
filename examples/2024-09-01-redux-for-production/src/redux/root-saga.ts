import { all } from 'redux-saga/effects';

import { watchLoadApp } from '@/features/app-loading/app-loading-saga';
import {
  watchLogin,
  watchLogout,
} from '@/features/user-authentication/user-authentication-saga';
import { watchFetchUserProfiles } from '@/features/user-profiles/user-profiles-saga';

export function* rootSaga() {
  yield all([
    watchFetchUserProfiles(),
    watchLoadApp(),
    watchLogin(),
    watchLogout(),
  ]);
}
