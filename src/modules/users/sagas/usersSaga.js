import { all, call, put, takeEvery } from 'redux-saga/effects';
import LivelloLS from 'lib/LocalStorage';
import { TOKEN_STORAGE_KEY } from 'modules/authentication/constants';
import { USERS_SAGA_LOAD, updateUsers } from '../actions/usersActions';

function* loadUsers() {
  const token = LivelloLS.getItem(TOKEN_STORAGE_KEY);
  const response = yield call(fetch, '/api/v1/users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = yield call([response, response.json]);

  yield put(updateUsers(data));
}

function* handleLoadUsers() {
  yield takeEvery(USERS_SAGA_LOAD, loadUsers);
}

export default function* usersSaga() {
  yield all([handleLoadUsers()]);
}
