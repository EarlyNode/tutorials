import { all } from 'redux-saga/effects';

import { watchHandleLoginClicked } from '../../features/user-profiles/user-profile-saga';

export function* rootSaga() {
  yield all([watchHandleLoginClicked()]);
}
