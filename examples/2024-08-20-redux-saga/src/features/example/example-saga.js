import { call, put, select, take } from '../../app/redux/effects';
import { increment, incrementBy, selectCount } from './example-reducer';

const fetchUser = async id => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`,
  );
  return await response.json();
};

export function* exampleSaga() {
  yield take('init');
  yield put(increment());
  const currentCount = yield select(selectCount);
  const user = yield call(fetchUser, currentCount);
  yield put(incrementBy(user.name.length));
}
